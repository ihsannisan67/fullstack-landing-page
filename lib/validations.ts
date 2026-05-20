import { z } from 'zod'

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter')
    .regex(/^[a-zA-Z\s']+$/, 'Nama hanya boleh mengandung huruf dan spasi'),
  email: z
    .string()
    .email('Format email tidak valid')
    .max(255, 'Email maksimal 255 karakter'),
  phone: z
    .string()
    .min(10, 'Nomor telepon minimal 10 digit')
    .max(20, 'Nomor telepon maksimal 20 digit')
    .regex(
      /^[\d\s+()-]+$/,
      'Nomor telepon hanya boleh mengandung angka, spasi, dan tanda + ( ) -'
    ),
  landSize: z.enum(['< 1 ha', '1-10 ha', '10-50 ha', '> 50 ha'], {
    required_error: 'Pilih luas lahan',
  }),
  location: z
    .string()
    .min(3, 'Lokasi minimal 3 karakter')
    .max(200, 'Lokasi maksimal 200 karakter'),
  message: z
    .string()
    .max(1000, 'Pesan maksimal 1000 karakter')
    .optional(),
  source: z.string().optional(),
})

export type LeadFormData = z.infer<typeof leadSchema>

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"]/g, '') // Remove dangerous characters
    .trim()
}

export const validateLeadData = (data: unknown) => {
  return leadSchema.safeParse(data)
}