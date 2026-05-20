import { ResearchStat } from '@/types'

export const DEFORESTATION_STATS: ResearchStat[] = [
  {
    label: 'Hektar hutan hilang per tahun',
    value: '464.000',
    numericValue: 464000,
    source: 'KLHK, 2022',
  },
  {
    label: 'Luas lahan kritis nasional',
    value: '14,9 juta',
    numericValue: 14900000,
    source: 'KLHK, 2021',
  },
  {
    label: 'Peringkat deforestasi tertinggi',
    value: '3',
    suffix: ' di dunia',
    source: 'FAO, 2020',
  },
  {
    label: 'Terumbu karang rusak',
    value: '50%',
    source: 'LIPI',
  },
  {
    label: 'Kerugian ekonomi per tahun',
    value: 'Rp 685 triliun',
    source: 'BAPPENAS, 2019',
  },
  {
    label: 'Target rehabilitasi per tahun',
    value: '600.000 ha',
    source: 'RPJMN 2020-2024',
  },
  {
    label: 'Hutan Kalimantan hilang (20 tahun)',
    value: '9,7 juta ha',
    source: 'Global Forest Watch, 2023',
  },
  {
    label: 'Lahan gambut terdegradasi',
    value: '6,7 juta ha',
    source: 'BRG, 2022',
  },
]

export const SOCIAL_IMPACTS = [
  {
    label: 'Petani terdampak degradasi lahan',
    value: '25 juta',
  },
  {
    label: 'Sumber air terancam di Jawa',
    value: '40%',
  },
  {
    label: 'Peningkatan bencana (10 tahun)',
    value: '300%',
    suffix: ' lebih banyak',
  },
]

export const OPPORTUNITIES = [
  {
    label: 'Pasar carbon credit (2030)',
    value: 'USD 1,5 miliar',
  },
  {
    label: 'Provinsi dengan PSA aktif',
    value: '34 provinsi',
  },
]

export const getHighlightedStats = (): ResearchStat[] => {
  // Return 4 most impactful statistics
  return [
    DEFORESTATION_STATS[0], // 464.000 hektar/hahun
    DEFORESTATION_STATS[1], // 14,9 juta hektar lahan kritis
    DEFORESTATION_STATS[2], // Peringkat 3 dunia
    DEFORESTATION_STATS[4], // Rp 685 triliun kerugian
  ]
}