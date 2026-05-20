'use client'

import {
  Mountain,
  Waves,
  Trees,
  Leaf,
  Award,
  type LucideIcon,
} from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { SERVICES } from '@/lib/data/services'

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Mountain,
  Waves,
  Trees,
  Leaf,
  Award,
}

export function Services() {
  return (
    <section id="layanan" className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block bg-leaf/10 text-forest-mid px-4 py-2 rounded-full text-sm font-medium mb-4">
            Layanan Kami
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest-dark mb-6">
            Solusi Reboisasi Terintegrasi
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Kami menyediakan layanan lengkap dari perencanaan hingga
            monitoring jangka panjang untuk memastikan keberhasilan rehabilitasi.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Leaf

            return (
              <StaggerItem key={service.id}>
                <AnimatedSection
                  delay={0.1}
                  className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 bg-leaf/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-leaf group-hover:scale-110 transition-all">
                    <Icon className="w-7 h-7 text-leaf group-hover:text-white transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-forest-dark mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted mb-6 flex-grow">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-leaf rounded-full mt-2 flex-shrink-0" />
                        <span className="text-forest-dark/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-16">
          <p className="text-muted mb-4">
            Butuh solusi custom untuk kondisi lahan Anda?
          </p>
          <a
            href="#konsultasi"
            className="inline-flex items-center gap-2 text-forest-mid hover:text-leaf font-medium transition-colors"
          >
            Konsultasi gratis dengan tim kami
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}