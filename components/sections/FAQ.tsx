'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/AnimatedSection'
import { FAQ_ITEMS } from '@/lib/data/faq'

interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left hover:text-leaf transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg font-semibold text-forest-dark pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-forest-mid flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-muted leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block bg-leaf/10 text-forest-mid px-4 py-2 rounded-full text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest-dark mb-6">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang layanan dan proses
            kerja kami.
          </p>
        </AnimatedSection>

        {/* FAQ Grid */}
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </AnimatedSection>

          {/* Contact hint */}
          <AnimatedSection delay={0.2} className="text-center mt-8">
            <p className="text-muted">
              Tidak menemukan jawaban yang Anda cari?{' '}
              <a
                href="#konsultasi"
                className="text-leaf hover:underline font-medium"
              >
                Hubungi kami langsung
              </a>
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}