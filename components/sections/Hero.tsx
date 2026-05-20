'use client'

import { motion } from 'framer-motion'
import { ArrowRight, TreePine } from 'lucide-react'
import { AnimatedSection } from '@/components/AnimatedSection'
import { LeadForm } from '@/components/LeadForm'

export function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-cream via-sand to-cream flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231A3A2A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="relative z-10">
            <AnimatedSection delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-leaf/10 text-forest-mid px-4 py-2 rounded-full mb-6">
                <TreePine className="w-4 h-4" />
                <span className="text-sm font-medium">
                  spesialis jasa reboisasi profesional
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-forest-dark leading-tight mb-6">
                Setiap Lahan{' '}
                <span className="text-leaf">Adalah Kesempatan</span> untuk Pulih
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-lg md:text-xl text-muted mb-8 leading-relaxed">
                Kami membantu memulihkan lahan terdegradasi — bekas tambang,
                perkebunan, atau lahan kritis — menjadi hutan produktif yang
                bermanfaat bagi lingkungan dan masyarakat.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="#konsultasi"
                  className="inline-flex items-center gap-2 bg-leaf hover:bg-forest-mid text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors group"
                >
                  Konsultasi Gratis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 border-2 border-forest-dark text-forest-dark hover:bg-forest-dark hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
                >
                  Lihat Portfolio
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="flex items-center gap-6 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-leaf rounded-full" />
                  <span>Survival rate 85%+</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-leaf rounded-full" />
                  <span>Garansi 5 tahun</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-leaf rounded-full" />
                  <span>32+ proyek sukses</span>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Form */}
          <AnimatedSection delay={0.3} direction="right" className="relative z-10">
            <div id="konsultasi">
              <LeadForm variant="hero" />
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-forest-dark/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-forest-dark/50 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}