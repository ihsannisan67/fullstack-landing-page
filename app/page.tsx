import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Problem } from '@/components/sections/Problem'
import { Services } from '@/components/sections/Services'
import { Portfolio } from '@/components/sections/Portfolio'
import { Testimonials } from '@/components/sections/Testimonials'
import { AboutUs } from '@/components/sections/AboutUs'
import { FAQ } from '@/components/sections/FAQ'
import { CTABottom } from '@/components/sections/CTABottom'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Problem />
      <Services />
      <Portfolio />
      <Testimonials />
      <AboutUs />
      <FAQ />
      <CTABottom />
      <Footer />
    </main>
  )
}