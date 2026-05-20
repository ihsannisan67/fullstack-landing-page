'use client'

import Image from 'next/image'
import { Quote } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { TESTIMONIALS } from '@/lib/data/testimonials'

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block bg-leaf/10 text-forest-mid px-4 py-2 rounded-full text-sm font-medium mb-4">
            Testimoni
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest-dark mb-6">
            Kata Mereka yang Telah Percaya
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Kepuasan klien adalah prioritas utama kami. Berikut testimoni dari
            para mitra dan klien yang telah bekerja sama dengan LangkahHijau.
          </p>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <AnimatedSection
                delay={0.1}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full"
              >
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-leaf/10 rounded-2xl flex items-center justify-center mb-6">
                  <Quote className="w-6 h-6 text-leaf" />
                </div>

                {/* Quote Text */}
                <blockquote className="text-forest-dark/80 text-lg leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {testimonial.avatar && (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                  )}
                  <div>
                    <div className="font-display font-bold text-forest-dark">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-leaf font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}