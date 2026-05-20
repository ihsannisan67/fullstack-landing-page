'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { getHighlightedStats } from '@/lib/data/research'

// Animated counter hook
function useAnimatedCounter(
  endValue: number,
  duration: number = 2000,
  startWhenInView: boolean = true
) {
  const [value, setValue] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (startWhenInView && !isInView) return
    if (hasStarted) return

    setHasStarted(true)
    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease out cubic)
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(startValue + (endValue - startValue) * eased)

      setValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [endValue, duration, isInView, startWhenInView, hasStarted])

  return { ref, value }
}

// Single stat component with animated counter
function StatCard({
  label,
  value,
  numericValue,
  source,
}: {
  label: string
  value: string
  numericValue?: number
  source: string
}) {
  const { ref, value: animatedValue } = useAnimatedCounter(numericValue || 0)

  const displayValue =
    numericValue !== undefined
      ? numericValue >= 1000000
        ? `${(animatedValue / 1000000).toFixed(1)} juta`
        : numericValue >= 1000
        ? animatedValue >= 1000000
          ? `${(animatedValue / 1000000).toFixed(1)} jt`
          : `${Math.floor(animatedValue / 1000)} rb`
        : String(animatedValue)
      : value

  return (
    <div ref={ref} className="text-center p-6 bg-white/50 rounded-2xl backdrop-blur-sm">
      <div className="font-display text-4xl md:text-5xl font-bold text-earth mb-2">
        {displayValue}
      </div>
      <div className="text-forest-dark/80 font-medium mb-2">{label}</div>
      <div className="text-xs text-muted">Sumber: {source}</div>
    </div>
  )
}

export function Problem() {
  const stats = getHighlightedStats()

  return (
    <section className="py-20 md:py-32 bg-forest-dark relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Fakta Deforestasi Indonesia
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Indonesia kehilangan hutan lebih cepat dari negara manapun. Data
            berikut menunjukkan urgensi rehabilitasi lahan.
          </p>
        </AnimatedSection>

        {/* Stats Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StaggerItem key={index}>
              <StatCard
                label={stat.label}
                value={stat.value}
                numericValue={stat.numericValue}
                source={stat.source}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Impact message */}
        <AnimatedSection delay={0.4} className="mt-16 text-center">
          <div className="bg-earth/20 border border-earth/30 rounded-2xl p-8 max-w-3xl mx-auto">
            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              <span className="font-accent italic text-leaf text-xl md:text-2xl">
                "Kerugian ekonomi akibat degradasi lahan mencapai{' '}
              </span>
              <span className="font-bold text-earth-light">Rp 685 triliun per tahun</span>
              <span className="font-accent italic text-leaf text-xl md:text-2xl">
                . Rehabilitasi bukan pilihan, tapi keharusan."
              </span>
            </p>
          </div>
        </AnimatedSection>

        {/* CTA hint */}
        <AnimatedSection delay={0.5} className="mt-12 text-center">
          <p className="text-white/60">
            Bergabunglah dengan kami dalam memulihkan{' '}
            <a href="#layanan" className="text-leaf hover:underline">
              ekosistem Indonesia
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}