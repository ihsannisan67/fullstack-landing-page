'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Loader2, X } from 'lucide-react'
import { leadSchema, type LeadFormData } from '@/lib/validations'
import { cn } from '@/lib/utils'

interface LeadFormProps {
  variant?: 'hero' | 'bottom'
  onSuccess?: () => void
}

export function LeadForm({ variant = 'hero', onSuccess }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  })

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          source: typeof window !== 'undefined' ? window.location.href : '',
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        reset()
        onSuccess?.()
      } else {
        setErrorMessage(result.error || 'Terjadi kesalahan. Silakan coba lagi.')
      }
    } catch {
      setErrorMessage('Gagal mengirim data. Silakan periksa koneksi Anda.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-leaf/50 focus:border-leaf transition-all bg-white text-forest-dark placeholder:text-gray-400'

  const labelClass = 'block text-sm font-medium text-forest-dark mb-2'

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 text-center shadow-lg border border-leaf/20"
      >
        <div className="w-16 h-16 bg-leaf/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-leaf" />
        </div>
        <h3 className="font-display text-2xl font-bold text-forest-dark mb-2">
          Terima Kasih!
        </h3>
        <p className="text-muted mb-4">
          Data Anda berhasil kami terima. Tim kami akan menghubungi Anda dalam
          1x24 jam kerja.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-leaf hover:text-forest-mid font-medium"
        >
          Kirim another request
        </button>
      </motion.div>
    )
  }

  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100',
        variant === 'hero' ? 'max-w-lg' : 'max-w-xl mx-auto'
      )}
    >
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl font-bold text-forest-dark">
          {variant === 'hero'
            ? 'Mulai Konsultasi Gratis'
            : 'Rehabilitasi Lahan Anda'}
        </h3>
        <p className="text-muted mt-2">
          {variant === 'hero'
            ? 'Isi form di bawah dan tim kami akan menghubungi Anda'
            : 'Dapatkan estimasi biaya dan timeline untuk proyek Anda'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClass}>
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Masukkan nama lengkap Anda"
            className={cn(inputClass, errors.name && 'border-red-500')}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="email@contoh.com"
            className={cn(inputClass, errors.email && 'border-red-500')}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            Nomor Telepon <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="08xxxxxxxxxx"
            className={cn(inputClass, errors.phone && 'border-red-500')}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Land Size */}
        <div>
          <label htmlFor="landSize" className={labelClass}>
            Luas Lahan <span className="text-red-500">*</span>
          </label>
          <select
            id="landSize"
            className={cn(inputClass, errors.landSize && 'border-red-500')}
            {...register('landSize')}
          >
            <option value="">Pilih luas lahan</option>
            <option value="< 1 ha">Kurang dari 1 ha</option>
            <option value="1-10 ha">1 - 10 ha</option>
            <option value="10-50 ha">10 - 50 ha</option>
            <option value="> 50 ha">Lebih dari 50 ha</option>
          </select>
          {errors.landSize && (
            <p className="text-red-500 text-sm mt-1">
              {errors.landSize.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className={labelClass}>
            Lokasi Lahan <span className="text-red-500">*</span>
          </label>
          <input
            id="location"
            type="text"
            placeholder="Contoh: Kalimantan Timur, Kec. Muara Komam"
            className={cn(inputClass, errors.location && 'border-red-500')}
            {...register('location')}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Message (optional) */}
        <div>
          <label htmlFor="message" className={labelClass}>
            Pesan (opsional)
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder="Ceritakan kebutuhan Anda secara singkat..."
            className={cn(inputClass, 'resize-none')}
            {...register('message')}
          />
        </div>

        {/* Error message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm"
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-leaf hover:bg-forest-mid disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Kirim Permintaan
            </>
          )}
        </button>

        <p className="text-center text-sm text-muted">
          Kami tidak akan membagikan data Anda ke pihak ketiga.
        </p>
      </form>
    </div>
  )
}