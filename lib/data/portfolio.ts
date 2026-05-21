import { PortfolioItem } from '@/types'

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    title: 'Rehabilitasi Lahan Bekas Tambang Batubara',
    location: 'Kalimantan Timur',
    area: '120 ha',
    duration: '18 bulan',
    year: '2023',
    description:
      'Revegetasi lahan pasca tambang batu bara dengan metode hydroseeding dan penanaman 45.000 jenis endemik Kalimantan. Program ini mengembalikan ekosistem hutan tropis yang telah hilang selama 15 tahun operasional tambang.',
    stats: {
      treesPlanted: 45000,
      survivalRate: '87%',
      carbonOffset: '240 ton CO₂/tahun',
    },
    tags: ['Tambang Batubara', 'Revegetasi', 'Kalimantan'],
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
  },
  {
    id: '2',
    title: 'Restorasi Mangrove Pantai Utara',
    location: 'Kalimantan Barat',
    area: '85 ha',
    duration: '24 bulan',
    year: '2023',
    description:
      'Penanaman mangrove untuk melindungi garis pantai dari abrasi dan meningkatkan kualitas habitat pesisir. Program kerja sama dengan pemerintah daerah dan komunitas pescadores (nelayan) setempat.',
    stats: {
      treesPlanted: 120000,
      survivalRate: '92%',
      carbonOffset: '480 ton CO₂/tahun',
    },
    tags: ['Mangrove', 'Pesisir', 'Kalimantan'],
    image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=800&q=80',
  },
  {
    id: '3',
    title: 'Rehabilitasi Lahan Kritis Gunung Gede',
    location: 'Jawa Barat',
    area: '65 ha',
    duration: '12 bulan',
    year: '2024',
    description:
      'Percepatan regenerasi hutan di kawasan lereng Gunung Gede yang mengalami degradasi akibat illegal logging. Kombinasi penanaman aktif dan pendekatan participatif dengan masyarakat sekitar hutan.',
    stats: {
      treesPlanted: 28000,
      survivalRate: '84%',
      carbonOffset: '156 ton CO₂/tahun',
    },
    tags: ['Hutan Gunung', ' Jawa', 'Komunitas'],
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
  },
  {
    id: '4',
    title: 'Penghijauan Lahan Perkebunan Sawit Terdampak',
    location: 'Sumatera Selatan',
    area: '200 ha',
    duration: '30 bulan',
    year: '2022',
    description:
      'Transformasi lahan perkebunan sawit tidak aktif menjadi hutan produktif dengan jenis-jenis pohon native Sumatera. Program ini juga memberikan alternatif pendapatan bagi mantan pekerja perkebunan.',
    stats: {
      treesPlanted: 85000,
      survivalRate: '89%',
      carbonOffset: '520 ton CO₂/tahun',
    },
    tags: ['Perkebunan', 'Sumatera', 'Transformasi'],
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80',
  },
]

export const getPortfolioById = (id: string): PortfolioItem | undefined => {
  return PORTFOLIO_ITEMS.find((item) => item.id === id)
}

export const getPortfolioByTag = (tag: string): PortfolioItem[] => {
  return PORTFOLIO_ITEMS.filter((item) => item.tags.includes(tag))
}