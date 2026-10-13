export type { Locale } from '@/lib/i18n/config'

export type DietaryTag = 'vegetarian' | 'vegan' | 'gluten-free' | 'spicy'
export type Allergen =
  | 'gluten' | 'dairy' | 'eggs' | 'fish' | 'shellfish' | 'nuts'
  | 'sesame' | 'sulphites' | 'soy' | 'celery' | 'mustard'
export type MenuCategory =
  | 'starters' | 'salads' | 'mains' | 'seafood' | 'meat'
  | 'vegetarian' | 'desserts' | 'drinks' | 'wine'

export interface MenuItem {
  id: string
  slug: string
  name: string
  description: string
  price: number // MAD
  category: MenuCategory
  image: string
  imageAlt: string
  ingredients: string[]
  allergens: Allergen[]
  dietary: DietaryTag[]
  calories: number
  popularity: number // 0-100
  chefsChoice: boolean
  chefNote?: string
  pairing: string
  available: boolean
}

export interface Review {
  id: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
  date: string // ISO yyyy-mm-dd
  title: string
  body: string
  visit: string
  featured?: boolean
}

export interface EventItem {
  id: string
  slug: string
  name: string
  date: string
  startTime: string
  endTime: string
  location: string
  summary: string
  description: string
  highlights: string[]
  price: number
  seatsTotal: number
  seatsAvailable: number
  image: string
  imageAlt: string
}

export interface Offer {
  id: string
  name: string
  summary: string
  validFrom: string
  validTo: string
  terms: string[]
  priceNote: string
  image: string
  imageAlt: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  specialties: string[]
  experience: string
  image: string
  imageAlt: string
}

export type GalleryCategory = 'food' | 'restaurant' | 'chef' | 'events' | 'atmosphere'
export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: GalleryCategory
  aspect: 'portrait' | 'landscape' | 'square'
}

export interface FaqItem {
  id: string
  category: 'reservations' | 'visiting' | 'dining'
  question: string
  answer: string
}

export type SeatingId = 'main' | 'terrace' | 'private' | 'bar'
export type OccasionId = 'birthday' | 'anniversary' | 'business' | 'date' | 'other'

export interface Reservation {
  id: string
  date: string
  time: string
  guests: number
  seating: SeatingId
  firstName: string
  lastName: string
  email: string
  phone: string
  occasion: OccasionId
  requests: string
  status: 'confirmed' | 'cancelled'
  createdAt: string
  demo: true
}
export type ReservationInput = Omit<Reservation, 'id' | 'status' | 'createdAt' | 'demo'>

export interface OpeningHours {
  day: number // 0 = Sunday
  ranges: [string, string][]
}

export interface Slot {
  time: string
  available: boolean
}
