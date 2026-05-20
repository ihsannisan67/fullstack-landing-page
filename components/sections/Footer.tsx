'use client'

import Link from 'next/link'
import { TreePine, Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react'

const footerLinks = {
  layanan: [
    { label: 'Revegetasi Lahan Tambang', href: '#layanan' },
    { label: 'Penanaman Mangrove', href: '#layanan' },
    { label: 'Hutan Kota', href: '#layanan' },
    { label: 'Konsultasi Carbon Credit', href: '#layanan' },
  ],
  perusahaan: [
    { label: 'Tentang Kami', href: '#tentang' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Testimoni', href: '#testimoni' },
    { label: 'Karir', href: '#' },
  ],
  resources: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Blog', href: '#' },
    { label: 'Panduan Reboisasi', href: '#' },
    { label: 'Carbon Calculator', href: '#' },
  ],
  legal: [
    { label: 'Kebijakan Privasi', href: '#' },
    { label: 'Syarat & Ketentuan', href: '#' },
    { label: 'Disclaimer', href: '#' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
]

export function Footer() {
  return (
    <footer className="bg-forest-dark py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-leaf rounded-xl flex items-center justify-center">
                <TreePine className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                LangkahHijau
              </span>
            </Link>
            <p className="text-white/60 text-sm mb-6 max-w-xs">
              Spesialis jasa reboisasi profesional. Kami membantu memulihkan
              lahan terdegradasi menjadi hutan produktif yang bermanfaat bagi
              lingkungan dan masyarakat.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:info@langkahhijau.id"
                className="flex items-center gap-3 text-white/60 hover:text-leaf transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>info@langkahhijau.id</span>
              </a>
              <a
                href="tel:+622112345678"
                className="flex items-center gap-3 text-white/60 hover:text-leaf transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+62 21 1234 5678</span>
              </a>
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Jl. Sudirman No. 123, Jakarta Selatan 12190</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Layanan</h4>
            <ul className="space-y-2">
              {footerLinks.layanan.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-leaf transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Perusahaan</h4>
            <ul className="space-y-2">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-leaf transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-leaf transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} LangkahHijau. Semua hak dilindungi.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-leaf transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                  </a>
                )
              })}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/40 hover:text-white/60 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}