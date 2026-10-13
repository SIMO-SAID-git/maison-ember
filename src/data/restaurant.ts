import type { OpeningHours } from '@/types'

/** Core facts about the (fictional) restaurant. Single source of truth for UI, SEO and JSON-LD. */
export const restaurant = {
  name: 'Maison Ember',
  tagline: 'Contemporary Mediterranean, cooked over fire',
  cuisine: ['Mediterranean', 'Moroccan', 'French'],
  priceRange: 'MAD 250–600',
  founded: 2016,
  timezone: 'Africa/Casablanca',
  address: {
    street: '14 Rue Oued Fès',
    district: 'Agdal',
    city: 'Rabat',
    postalCode: '10090',
    country: 'Morocco',
    countryCode: 'MA',
  },
  geo: { lat: 33.9936, lng: -6.8528 },
  phone: '+212 537 00 41 28',
  phoneHref: 'tel:+212537004128',
  email: 'tables@maisonember.example',
  social: [
    { id: 'instagram', label: 'Instagram', handle: '@maisonember', url: 'https://www.instagram.com/' },
    { id: 'facebook', label: 'Facebook', handle: 'Maison Ember Rabat', url: 'https://www.facebook.com/' },
  ],
} as const

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${restaurant.name}, ${restaurant.address.street}, ${restaurant.address.city}`,
)}`

/** 0 = Sunday. Empty ranges = closed. */
export const hours: OpeningHours[] = [
  { day: 1, ranges: [] },
  { day: 2, ranges: [['12:30', '15:00'], ['18:00', '22:30']] },
  { day: 3, ranges: [['12:30', '15:00'], ['18:00', '22:30']] },
  { day: 4, ranges: [['12:30', '15:00'], ['18:00', '22:30']] },
  { day: 5, ranges: [['12:30', '15:00'], ['18:00', '23:30']] },
  { day: 6, ranges: [['12:30', '15:00'], ['18:00', '23:30']] },
  { day: 0, ranges: [['12:30', '16:00']] },
]

export const story = {
  headline: 'A kitchen built around one wood-fired hearth',
  paragraphs: [
    'Maison Ember began in 2016 as a ten-table room in Agdal and a single hearth built from reclaimed Meknès brick. Mehdi Lahlou and Zineb Chraibi had cooked and served in Lyon, Barcelona and Casablanca. They wanted a place where Atlantic fish, Middle Atlas lamb and the vegetables from Témara market gardens were cooked simply, over vine cuttings and olive wood.',
    'Ten years on, the room has grown to forty-two seats, a terrace and a cellar, but the idea has not changed. Everything that leaves the kitchen touches fire at some point, even the dessert.',
  ],
}

export const philosophy = [
  { title: 'Fire first', text: 'One hearth, four temperatures. We cook with olive wood and vine cuttings, and we let the fire decide the pace of the evening.' },
  { title: 'Short supply chains', text: 'Most of what you eat comes from within 300 kilometres. We know the fishermen, shepherds and growers by name, and they are listed on the menu.' },
  { title: 'Generous, never fussy', text: 'Plates are composed with care and served without ceremony. The best compliment is a table that stays an hour longer than planned.' },
]

export const experiences = [
  { id: 'dining', title: 'Fine dining', text: 'À la carte or a five-course menu in the main dining room, with service paced to your table.', image: '/images/interior.svg', alt: 'The main dining room at Maison Ember, lit by low pendant lamps' },
  { id: 'private', title: 'Private dining', text: 'A room for six to fourteen guests with its own entrance, a dedicated server and a menu we write with you.', image: '/images/private.svg', alt: 'The private dining room set for ten' },
  { id: 'seasonal', title: 'Seasonal menu', text: 'The menu changes with the market. Autumn brings figs, quince, wild mushrooms and the first Atlantic sea bass of the cold season.', image: '/images/seasonal.svg', alt: 'A table of autumn produce: figs, quince and mushrooms' },
  { id: 'wine', title: 'Wine pairing', text: 'Our sommelier pours Moroccan, French and Spanish bottles alongside each course, including a few we only buy in small lots.', image: '/images/cellar.svg', alt: 'Bottles resting in the cellar at Maison Ember' },
  { id: 'live', title: 'Chef\u2019s counter', text: 'Eight seats facing the hearth. You watch the cooks work and Mehdi often sends out an extra plate he is testing.', image: '/images/kitchen.svg', alt: 'Cooks working at the wood-fired hearth' },
]

export const awards = [
  { year: 2025, title: 'Table of the Year', issuer: 'Guide Atlas Gourmand' },
  { year: 2024, title: 'Best Wine List in Morocco', issuer: 'Cave & Carafe Awards' },
  { year: 2023, title: 'Sustainable Kitchen label', issuer: 'Maroc Terroir Initiative' },
]

export const timeline = [
  { year: '2016', title: 'Ten tables and one hearth', text: 'Maison Ember opens on Rue Oued Fès with a four-dish menu.' },
  { year: '2018', title: 'The terrace and the cellar', text: 'We add a shaded terrace and begin building a wine list around small producers.' },
  { year: '2020', title: 'Eleven weeks closed', text: 'The kitchen stayed open for hospital staff and prepared about 4,000 meals before reopening in June.' },
  { year: '2022', title: 'The chef\u2019s counter', text: 'Eight seats in front of the fire, and the first seasonal tasting menu.' },
  { year: '2025', title: 'Table of the Year', text: 'Recognised by Guide Atlas Gourmand for cooking that is, in their words, plainly generous.' },
]

export const sourcing = [
  { name: 'Atlantic day boats', origin: 'Larache', note: 'Sea bass, sardines, langoustines' },
  { name: 'Middle Atlas lamb', origin: 'Near Azrou', note: 'Grass-fed, slow-grown, delivered whole' },
  { name: 'Olive oil', origin: 'Meknès', note: 'A family press, cold-extracted each November' },
  { name: 'Saffron', origin: 'Taliouine', note: 'Bought directly from a women\u2019s cooperative' },
  { name: 'Market vegetables', origin: 'Témara', note: 'Picked the same morning, twice a week' },
]

export const sustainability = [
  'Fish bought whole, with trimmings used for stocks and staff meals.',
  'Wood for the hearth comes from pruned olive and vine, never felled timber.',
  'Kitchen waste is composted by a market garden in Témara.',
  'No single-use plastics, and still water is filtered and bottled in house.',
]

export const directions = [
  { mode: 'By taxi', text: 'Ask for Rue Oued Fès in Agdal. The restaurant has a green door and a lantern above it.' },
  { mode: 'By tram', text: 'Get off at Agdal station. It is about a six-minute walk.' },
  { mode: 'By car', text: 'Valet parking is available at the door from Thursday to Saturday evenings. A public car park is two streets away.' },
]
