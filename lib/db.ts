// Database connection helper for Vercel Postgres
// This is a stub that will work when VERCEL_POSTGRES connection string is provided

import { sql } from '@vercel/postgres'

export interface DbLead {
  id: number
  name: string
  email: string
  phone: string
  land_size: string
  location: string
  message: string | null
  source: string | null
  created_at: Date
  status: string
}

// Check if database is configured
export const isDbConfigured = (): boolean => {
  const url = process.env.POSTGRES_URL
  return !!url && !url.includes('placeholder')
}

// Save lead to database
export async function saveLead(data: {
  name: string
  email: string
  phone: string
  landSize: string
  location: string
  message?: string
  source?: string
}): Promise<{ success: boolean; id?: number; error?: string }> {
  try {
    if (!isDbConfigured()) {
      // Stub mode - return success without saving
      console.log('[DB Stub] Lead received:', data)
      return { success: true, id: Math.floor(Math.random() * 10000) }
    }

    const result = await sql`
      INSERT INTO leads (name, email, phone, land_size, location, message, source)
      VALUES (
        ${data.name},
        ${data.email},
        ${data.phone},
        ${data.landSize},
        ${data.location},
        ${data.message || null},
        ${data.source || null}
      )
      RETURNING id
    `

    return { success: true, id: result.rows[0].id }
  } catch (error) {
    console.error('[DB Error]', error)
    return {
      success: false,
      error: 'Gagal menyimpan data. Silakan coba lagi.',
    }
  }
}

// Get all leads (for admin)
export async function getAllLeads(): Promise<DbLead[]> {
  try {
    if (!isDbConfigured()) {
      return []
    }

    const result = await sql`SELECT * FROM leads ORDER BY created_at DESC`
    return result.rows as DbLead[]
  } catch (error) {
    console.error('[DB Error]', error)
    return []
  }
}

// Update lead status
export async function updateLeadStatus(
  id: number,
  status: 'new' | 'contacted' | 'converted'
): Promise<boolean> {
  try {
    if (!isDbConfigured()) {
      return true
    }

    await sql`UPDATE leads SET status = ${status} WHERE id = ${id}`
    return true
  } catch (error) {
    console.error('[DB Error]', error)
    return false
  }
}

// Initialize database schema
export async function initDbSchema(): Promise<void> {
  try {
    if (!isDbConfigured()) {
      console.log('[DB Stub] Skipping schema initialization')
      return
    }

    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        land_size VARCHAR(20) NOT NULL,
        location TEXT NOT NULL,
        message TEXT,
        source VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        status VARCHAR(20) DEFAULT 'new'
      )
    `
    console.log('[DB] Schema initialized')
  } catch (error) {
    console.error('[DB Error]', error)
  }
}