import { Service } from '@/types'

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Revegetasi Lahan Bekas Tambang',
    description:
      'Restorasi lahan terdegradasi akibat aktivitas pertambangan dengan metode biologis dan fisik rehabilitasi yang terukur dan berkelanjutan.',
    icon: 'Mountain',
    features: [
      'Revegetasi dengan species endemic lokal',
      'Stabilisasi tanah dan pencegahan longsor',
      'Restorasi drainase alami',
      'Monitoring & maintenance 5 tahun',
    ],
  },
  {
    id: '2',
    title: 'Penanaman Mangrove',
    description:
      'Rehabilitasi ekosistem pesisir dan mangrove untuk perlindungan coastline, habitat satwa laut, dan sequestrasi karbon biru.',
    icon: 'Waves',
    features: [
      'Seleksi propagul mangrove lokal',
      'Pemasangan sediment control',
      'Pelibatan komunitas pesisir',
      'Eco-tourism development',
    ],
  },
  {
    id: '3',
    title: 'Hutan Kota & Urban Greening',
    description:
      'Penghijauan perkotaan untuk meningkatkan kualitas udara, mengurangi heat island effect, dan memberikan ruang hijau masyarakat.',
    icon: 'Trees',
    features: [
      'Desain ruang hijau terpadu',
      'Pemilihan tanaman urban-tolerant',
      'Sistem irigasi hemat air',
      'Percayakan & adopt-a-tree program',
    ],
  },
  {
    id: '4',
    title: 'Restorasi Hutan Alam',
    description:
      'Accelerated natural regeneration dan enrichment planting untuk memulihkan hutan alam yang terdegradasi.',
    icon: 'Leaf',
    features: [
      'Analisis ekologi site-specific',
      'Pengurangan competitional vegetation',
      'Enrichment planting dengan species target',
      'Wildlife corridor development',
    ],
  },
  {
    id: '5',
    title: 'Konsultasi & Sertifikasi Carbon',
    description:
      'Layanan konsultasi untuk project carbon credit dan bantuan proses sertifikasi melalui standar internasional.',
    icon: 'Award',
    features: [
      'Carbon stock assessment',
      'Project design document (PDD)',
      'Sertifikasi Verra/Gold Standard',
      'Monitoring & verification support',
    ],
  },
]