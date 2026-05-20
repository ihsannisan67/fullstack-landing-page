// Email helper for Resend
// This is a stub that will work when RESEND_API_KEY is provided

import { Resend } from 'resend'

// Lazy-initialized Resend client
let resendClient: Resend | null = null

function getResendClient(): Resend | null {
  if (!isEmailConfigured()) {
    return null
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  return resendClient
}

interface EmailOptions {
  to: string
  subject: string
  html: string
}

// Check if email is configured
export const isEmailConfigured = (): boolean => {
  const apiKey = process.env.RESEND_API_KEY
  return !!apiKey && !apiKey.includes('placeholder') && !apiKey.includes('re_placeholder')
}

// Send lead notification to admin
export async function sendLeadNotification(
  lead: {
    name: string
    email: string
    phone: string
    landSize: string
    location: string
    message?: string
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!isEmailConfigured()) {
      console.log('[Email Stub] Notification would be sent:', lead)
      return { success: true }
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@langkahhijau.id'
    const client = getResendClient()

    if (!client) {
      console.log('[Email Stub] Notification would be sent:', lead)
      return { success: true }
    }

    await client.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@langkahhijau.id',
      to: adminEmail,
      subject: `[LangkahHijau] New Lead: ${lead.name}`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Land Size:</strong> ${lead.landSize}</p>
        <p><strong>Location:</strong> ${lead.location}</p>
        ${lead.message ? `<p><strong>Message:</strong><br>${lead.message}</p>` : ''}
        <hr>
        <p><small>This email was auto-generated from langkahhijau.id</small></p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('[Email Error]', error)
    return {
      success: false,
      error: 'Gagal mengirim notifikasi. Data tetap tersimpan.',
    }
  }
}

// Send confirmation email to lead
export async function sendLeadConfirmation(
  email: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!isEmailConfigured()) {
      console.log('[Email Stub] Confirmation would be sent to:', email)
      return { success: true }
    }

    const client = getResendClient()
    if (!client) {
      console.log('[Email Stub] Confirmation would be sent to:', email)
      return { success: true }
    }

    await client.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@langkahhijau.id',
      to: email,
      subject: 'Terima Kasih - Konsultasi LangkahHijau',
      html: `
        <h2>Halo ${name},</h2>
        <p>Terima kasih telah menghubungi LangkahHijau. Tim kami akan menghubungi Anda dalam 1x24 jam kerja.</p>
        <p>Untuk informasi lebih lanjut, silakan kunjungi <a href="https://langkahhijau.id">website kami</a>.</p>
        <hr>
        <p><strong>LangkahHijau</strong><br>
        Setiap Lahan Adalah Kesempatan untuk Pulih</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('[Email Error]', error)
    return { success: false, error: 'Gagal mengirim email konfirmasi.' }
  }
}