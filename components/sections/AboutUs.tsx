'use client'

import Image from 'next/image'
import { Target, Users, Globe, Heart } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { TEAM_MEMBERS } from '@/lib/data/team'

const values = [
  {
    icon: Target,
    title: 'Keberlanjutan',
    description:
      'Setiap proyek dirancang untuk hasil jangka panjang, bukan solusi instan. Kami memastikan ekosistem yang kami bangun dapat bertahan dan berkembang mandiri.',
  },
  {
    icon: Users,
    title: 'Pelibatan Komunitas',
    description:
      'Kami melibatkan masyarakat lokal dalam setiap tahap, dari perencanaan hingga monitoring. Ini memastikan manfaat ekonomi dan sosial yang nyata.',
  },
  {
    icon: Globe,
    title: 'Berbasis Sains',
    description:
      'Semua keputusan rehab我们的 didasarkan pada data ilmiah dan best practice internasional. Kami terus mengikuti perkembangan riset terbaru.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description:
      'Kami transparan dalam reporting dan tidak menjanjikan lebih dari yang bisa kami delivered. Kepercayaan klien adalah fondasi bisnis kami.',
  },
]

export function AboutUs() {
  return (
    <section id="tentang" className="py-20 md:py-32 bg-forest-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <AnimatedSection direction="left">
            <span className="inline-block bg-leaf/20 text-leaf px-4 py-2 rounded-full text-sm font-medium mb-6">
              Misi Kami
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Memulihkan Lahan, Membangun Masa Depan
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              LangkahHijau didirikan dengan satu tujuan: menjadi partner tepercaya
              dalam rehabilitasi ekosistem Indonesia. Kami percaya bahwa setiap
              lahan, sekecil apapun, memiliki potensi untuk pulih dan memberikan
              manfaat bagi generations mendatang.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="font-display text-3xl font-bold text-leaf mb-1">32+</div>
                <div className="text-white/60 text-sm">Proyek Selesai</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="font-display text-3xl font-bold text-leaf mb-1">650+</div>
                <div className="text-white/60 text-sm">Hektar Direhabilitasi</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="font-display text-3xl font-bold text-leaf mb-1">280K+</div>
                <div className="text-white/60 text-sm">Pohon Tertanam</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="font-display text-3xl font-bold text-leaf mb-1">87%</div>
                <div className="text-white/60 text-sm">Rata-rata Survival</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Values */}
          <AnimatedSection direction="right">
            <div className="space-y-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 bg-leaf/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-leaf" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-white/60 text-sm">{value.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </AnimatedSection>
        </div>

        {/* Team Section */}
        <AnimatedSection className="mb-12">
          <h3 className="font-display text-2xl font-bold text-white text-center mb-4">
            Tim Kami
          </h3>
          <p className="text-white/60 text-center max-w-xl mx-auto">
            Dipimpin oleh para ahli kehutanan dan environmental science dengan
            pengalaman puluhan tahun di bidang restorasi ekosistem.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <StaggerItem key={member.id}>
              <AnimatedSection delay={0.1} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-leaf/30">
                  {member.image && (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  )}
                </div>
                <h4 className="font-display font-bold text-white mb-1">
                  {member.name}
                </h4>
                <p className="text-leaf text-sm font-medium mb-2">{member.role}</p>
                <p className="text-white/50 text-sm">{member.bio}</p>
              </AnimatedSection>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}