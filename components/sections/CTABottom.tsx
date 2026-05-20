'use client'

import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/AnimatedSection'
import { LeadForm } from '@/components/LeadForm'

export function CTABottom() {
  return (
    <section id="konsultasi" className="py-20 md:py-32 bg-gradient-to-br from-forest-mid to-forest-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-leaf/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-earth/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Siap Memulihkan Lahan Anda?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Jadwalkan konsultasi gratis dengan tim ahli kami. Kami akan membantu
              Anda menemukan solusi terbaik untuk kondisi lahan spesifik Anda.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                'Konsultasi Gratis & Tanpa Kompromi',
                'Estimasi Biaya Akurat',
                'Timeline Proyek yang Jelas',
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-white/80">
                  <div className="w-2 h-2 bg-leaf rounded-full" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.2}>
            <LeadForm variant="bottom" />
          </AnimatedSection>

          {/* Trust indicators */}
          <AnimatedSection delay={0.3} className="text-center mt-12">
            <div className="flex flex-wrap justify-center gap-6 text-white/50 text-sm">
              <div>✓ Data aman & terenkripsi</div>
              <div>✓ Tidak ada biaya tersembunyi</div>
              <div>✓ Respon dalam 1x24 jam</div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}