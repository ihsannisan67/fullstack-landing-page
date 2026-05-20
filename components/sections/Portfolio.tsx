'use client'

import Image from 'next/image'
import { MapPin, Calendar, Trees, TrendingUp } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { PORTFOLIO_ITEMS } from '@/lib/data/portfolio'

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-32 bg-sand">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block bg-earth/10 text-earth px-4 py-2 rounded-full text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest-dark mb-6">
            Proyek yang Telah Selesai
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Berikut beberapa proyek rehabilitasi yang telah kami kerjakan.
            Setiap proyek adalah bukti komitmen kami terhadap lingkungan.
          </p>
        </AnimatedSection>

        {/* Portfolio Grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-8">
          {PORTFOLIO_ITEMS.map((item) => (
            <StaggerItem key={item.id}>
              <AnimatedSection
                delay={0.1}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 to-transparent" />

                  {/* Tags on image */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/90 text-forest-dark text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-forest-dark mb-2">
                    {item.title}
                  </h3>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  <p className="text-forest-dark/70 text-sm mb-6 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-leaf font-bold">
                        <Trees className="w-4 h-4" />
                        <span className="text-lg">{item.stats.treesPlanted.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-muted">Pohon Tertanam</div>
                    </div>
                    <div className="text-center">
                      <div className="text-earth font-bold text-lg">{item.stats.survivalRate}</div>
                      <div className="text-xs text-muted">Survival Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-forest-mid font-bold text-lg">{item.stats.carbonOffset}</div>
                      <div className="text-xs text-muted">Carbon Offset</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom message */}
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <p className="text-forest-dark/60 text-sm">
            <span className="font-semibold">Total: </span>
            {PORTFOLIO_ITEMS.reduce((sum, item) => sum + item.stats.treesPlanted, 0).toLocaleString()}+
            pohon tertanam |{' '}
            {PORTFOLIO_ITEMS.length} proyek di seluruh Indonesia
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}