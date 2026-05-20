import { NextRequest, NextResponse } from 'next/server'
import { leadSchema, sanitizeInput } from '@/lib/validations'
import { saveLead } from '@/lib/db'
import { sendLeadNotification, sendLeadConfirmation } from '@/lib/email'

// Simple rate limiting - in production use Vercel Edge Config or Redis
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5 // max submissions
const RATE_WINDOW = 60 * 60 * 1000 // 1 hour in ms

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  return ip
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT - 1 }
  }

  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: RATE_LIMIT - record.count }
}

// POST /api/leads - Save a new lead
export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = getRateLimitKey(request)
    const { allowed, remaining } = checkRateLimit(ip)

    if (!allowed) {
      return NextResponse.json(
        { success: false, error: 'Terlalu banyak permintaan. Silakan coba lagi nanti.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate with Zod schema
    const result = leadSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return NextResponse.json(
        {
          success: false,
          error: 'Data tidak valid',
          fieldErrors: errors,
        },
        { status: 400 }
      )
    }

    // Sanitize input
    const sanitizedData = {
      name: sanitizeInput(result.data.name),
      email: sanitizeInput(result.data.email),
      phone: sanitizeInput(result.data.phone),
      landSize: result.data.landSize,
      location: sanitizeInput(result.data.location),
      message: result.data.message ? sanitizeInput(result.data.message) : undefined,
      source: result.data.source ? sanitizeInput(result.data.source) : undefined,
    }

    // Get UTM data from headers if available
    const utmSource = request.headers.get('x-utm-source')
    const utmMedium = request.headers.get('x-utm-medium')
    const utmCampaign = request.headers.get('x-utm-campaign')

    const source = utmSource || utmMedium || utmCampaign
      ? `utm_source=${utmSource || ''}&utm_medium=${utmMedium || ''}&utm_campaign=${utmCampaign || ''}`
      : undefined

    // Save to database
    const dbResult = await saveLead({ ...sanitizedData, source })

    if (!dbResult.success) {
      return NextResponse.json(
        { success: false, error: dbResult.error || 'Gagal menyimpan data' },
        { status: 500 }
      )
    }

    // Send notifications (fire-and-forget)
    sendLeadNotification(sanitizedData).catch((err) =>
      console.error('Failed to send admin notification:', err)
    )
    sendLeadConfirmation(sanitizedData.email, sanitizedData.name).catch((err) =>
      console.error('Failed to send confirmation:', err)
    )

    return NextResponse.json(
      {
        success: true,
        message: 'Terima kasih! Data Anda berhasil kami terima. Tim kami akan segera menghubungi Anda.',
        remaining,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[API Error]', error)
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem. Silakan coba lagi.' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
}