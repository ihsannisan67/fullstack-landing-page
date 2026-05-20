export interface Lead {
  id?: number
  name: string
  email: string
  phone: string
  landSize: LandSize
  location: string
  message?: string
  source?: string
  createdAt?: Date
  status?: LeadStatus
}

export type LandSize = '< 1 ha' | '1-10 ha' | '10-50 ha' | '> 50 ha'

export type LeadStatus = 'new' | 'contacted' | 'converted'

export interface PortfolioItem {
  id: string
  title: string
  location: string
  area: string
  duration: string
  year: string
  description: string
  stats: {
    treesPlanted: number
    survivalRate: string
    carbonOffset: string
  }
  tags: string[]
  image: string
  beforeImage?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  avatar?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface ResearchStat {
  label: string
  value: string
  numericValue?: number
  prefix?: string
  suffix?: string
  source: string
}