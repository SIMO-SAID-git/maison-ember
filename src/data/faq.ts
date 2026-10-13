import type { FaqItem } from '@/types'

export const faq: FaqItem[] = [
  { id: 'book', category: 'reservations', question: 'How do I reserve a table?', answer: 'Use the reservation page on this site, or call us on +212 537 00 41 28 between 11:00 and 22:00. For groups of 15 or more, please call or write to us.' },
  { id: 'cancel', category: 'reservations', question: 'What is your cancellation policy?', answer: 'You can cancel or change a reservation free of charge up to 12 hours before. For private dining and events, we ask for 72 hours.' },
  { id: 'groups', category: 'reservations', question: 'Do you take large groups?', answer: 'Yes. The private room seats six to fourteen. Larger parties can book the whole restaurant for a buyout: write to us and Zineb will reply within a day.' },
  { id: 'private', category: 'reservations', question: 'Can I book private dining?', answer: 'Yes. The private room has its own entrance and a dedicated server. We write the menu with you, and a minimum spend applies on Friday and Saturday.' },
  { id: 'dress', category: 'visiting', question: 'Is there a dress code?', answer: 'No formal dress code. Most guests come smart-casual. We would only ask you to leave beachwear and sports kit at home.' },
  { id: 'children', category: 'visiting', question: 'Are children welcome?', answer: 'Yes, especially at lunch and on Sundays. We have high chairs, a short children\u2019s menu and the kitchen is happy to adapt dishes. After 21:00 the room is quieter, so it suits older children best.' },
  { id: 'pets', category: 'visiting', question: 'Can I bring a dog?', answer: 'Small, well-behaved dogs are welcome on the terrace. Assistance dogs are welcome everywhere.' },
  { id: 'access', category: 'visiting', question: 'Is the restaurant accessible?', answer: 'The main dining room, terrace and restrooms are step-free. The private room is up two steps with a ramp available. Please tell us about any needs when booking.' },
  { id: 'parking', category: 'visiting', question: 'Where can I park?', answer: 'Valet parking is available at the door from Thursday to Saturday evenings. A public car park is two streets away.' },
  { id: 'diet', category: 'dining', question: 'Can you cater for dietary restrictions?', answer: 'Yes. Vegetarian, vegan and gluten-free dishes are marked on the menu, and the kitchen will adapt many others. Tell us when booking so the chef can plan.' },
  { id: 'allergy', category: 'dining', question: 'I have a food allergy. What should I do?', answer: 'Please tell us when you book and again to your server. Our kitchen handles nuts, gluten, shellfish and dairy, so we cannot guarantee a completely allergen-free environment, but we take every precaution.' },
  { id: 'pay', category: 'dining', question: 'Which payment methods do you accept?', answer: 'Cash (MAD), Visa, Mastercard and contactless payments. We do not accept cheques. A service charge is not added to the bill.' },
]
