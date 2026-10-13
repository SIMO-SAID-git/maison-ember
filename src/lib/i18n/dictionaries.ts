import type { Locale } from './config'

export const en = {
  meta: {
    siteTitle: 'Maison Ember | Contemporary Mediterranean restaurant in Rabat',
    siteDescription:
      'Wood-fired Mediterranean cooking in Agdal, Rabat. Reserve a table, explore the menu and book tasting events at Maison Ember.',
  },
  nav: {
    home: 'Home', menu: 'Menu', about: 'About', events: 'Events', gallery: 'Gallery', reviews: 'Reviews',
    contact: 'Contact', offers: 'Offers', faq: 'FAQ', favorites: 'Favourites', reserve: 'Reserve a table',
    reserveShort: 'Reserve', openMenu: 'Open menu', closeMenu: 'Close menu', skip: 'Skip to content',
    main: 'Main navigation', language: 'Language', callUs: 'Call us', myReservation: 'My reservation',
  },
  status: {
    open: 'Open now', closed: 'Closed', closesAt: 'until {time}', opensToday: 'Opens today at {time}', opensDay: 'Opens {day} at {time}',
  },
  common: {
    viewDetails: 'View details', close: 'Close', back: 'Back', continue: 'Continue', reset: 'Reset', tryAgain: 'Try again',
    guestOne: '1 guest', guestMany: '{n} guests', demo: 'Demo reservation',
    demoDisclaimer: 'This is a demonstration website. No table is held and no message is sent.',
    follow: 'Follow our journey', directions: 'Get directions', callRestaurant: 'Call the restaurant',
    address: 'Address', hours: 'Opening hours', phone: 'Phone', email: 'Email', closedDay: 'Closed',
    viewAll: 'View all', reserveTable: 'Reserve a table', perPerson: 'per person', readMore: 'Read more',
    backToMenu: 'Back to the menu', loading: 'Loading',
  },
  hero: {
    title: 'Cooked over fire. Meant for lingering.',
    body: 'Contemporary Mediterranean cooking around a single wood-fired hearth, in the heart of Agdal, Rabat.',
    explore: 'Explore the menu', scroll: 'Scroll',
  },
  home: {
    signatureTitle: 'Three plates we are known for',
    introTitle: 'A kitchen built around one wood-fired hearth',
    introLink: 'Read our story',
    experienceTitle: 'More than a table',
    menuTitle: 'This season on the pass',
    menuCta: 'View full menu',
    reserveTitle: 'Your table is waiting.',
    reserveBody: 'Pick a date and we will show you what is open.',
    reserveCta: 'Find a table',
    reviewsTitle: 'What guests write after dinner',
    reviewsCta: 'Read all reviews',
    eventsTitle: 'Evenings worth planning for',
    eventsCta: 'All events',
    galleryTitle: 'From the room and the fire',
    locationTitle: 'Find us in Agdal',
    date: 'Date', time: 'Time', guests: 'Guests', anyTime: 'Any time',
    closedMonday: 'We are closed on Mondays. Please choose another date.',
    pickDate: 'Choose a date',
  },
  menu: {
    title: 'The menu',
    intro: 'Seasonal dishes cooked over olive wood and vine cuttings. The menu changes with the market, so some dishes may not be available on the night.',
    search: 'Search dishes or ingredients',
    searchLabel: 'Search the menu',
    categories: {
      all: 'All', starters: 'Starters', salads: 'Salads', mains: 'Mains', seafood: 'Seafood', meat: 'Meat',
      vegetarian: 'Vegetarian', desserts: 'Desserts', drinks: 'Drinks', wine: 'Wine',
    },
    filters: 'Filters', price: 'Price', priceAny: 'Any price', priceUnder: 'Under {n}', priceMid: '{a} to {b}', priceOver: 'Over {n}',
    dietary: 'Dietary', spicy: 'Spicy', chefsChoice: 'Chef\u2019s choice', sort: 'Sort by',
    sortRecommended: 'Recommended', sortPriceAsc: 'Price, low to high', sortPriceDesc: 'Price, high to low', sortPopular: 'Most popular',
    results: '{n} dishes', resultsOne: '1 dish',
    noResultsTitle: 'No dishes match',
    noResultsBody: 'Try removing a filter or searching for a main ingredient like lamb, fig or saffron.',
    clearFilters: 'Clear filters', popular: 'Guest favourite', unavailable: 'Unavailable tonight',
    ingredients: 'Ingredients', allergens: 'Allergens', noAllergens: 'None declared', calories: 'Calories',
    pairing: 'Recommended pairing', chefNote: 'Chef\u2019s recommendation', dietaryInfo: 'Dietary',
    openFull: 'Open full page', favoriteAdd: 'Save to favourites', favoriteRemove: 'Remove from favourites',
    mockNote: 'Calories are indicative for this demonstration.', unavailableNote: 'This dish is not on tonight\u2019s menu. Ask your server about alternatives.',
  },
  dietary: { vegetarian: 'Vegetarian', vegan: 'Vegan', 'gluten-free': 'Gluten-free', spicy: 'Spicy', chef: 'Chef\u2019s signature' },
  allergens: {
    gluten: 'gluten', dairy: 'dairy', eggs: 'eggs', fish: 'fish', shellfish: 'shellfish', nuts: 'nuts',
    sesame: 'sesame', sulphites: 'sulphites', soy: 'soy', celery: 'celery', mustard: 'mustard',
  },
  reserve: {
    title: 'Reserve a table',
    intro: 'Choose a date, party size and time. This demo shows realistic availability and keeps your reservation in this browser.',
    steps: { date: 'Date', guests: 'Guests', time: 'Time', seating: 'Seating', details: 'Your details' },
    stepOf: 'Step {n} of {total}',
    dateTitle: 'Which day would you like to come?', dateHelp: 'We are closed on Mondays.', closedLabel: 'closed',
    prevMonth: 'Previous month', nextMonth: 'Next month',
    guestsTitle: 'How many guests?', guestsHelp: 'The private room is available from six guests.',
    largeParty: 'Parties of 15 or more: please contact us and we will arrange a buyout.',
    timeTitle: 'Choose a time', timeHelp: 'Times that are struck through are fully booked.',
    lunch: 'Lunch', dinner: 'Dinner', slotUnavailable: 'unavailable', loadingSlots: 'Checking availability',
    noSlotsClosedTitle: 'We do not serve on this day',
    noSlotsClosedBody: 'The restaurant is closed on Mondays. Please choose another date.',
    noSlotsFullTitle: 'This date is fully booked',
    noSlotsFullBody: 'No tables are free for your party. Try the day before or after, or write to us about a cancellation list.',
    chooseAnother: 'Choose another date',
    seatingTitle: 'Where would you like to sit?', seatingNeeds: 'For {min} to {max} guests', seatingUnavailable: 'Not available at this time',
    seating: {
      main: { name: 'Main dining room', desc: 'The heart of the restaurant, with a view of the hearth.' },
      terrace: { name: 'Terrace', desc: 'Shaded and lantern-lit, with the best evenings of the year.' },
      private: { name: 'Private dining', desc: 'A separate room with its own entrance and dedicated server.' },
      bar: { name: 'Bar', desc: 'Informal seats facing the bar. A good option for two.' },
    },
    detailsTitle: 'Who is the table for?',
    firstName: 'First name', lastName: 'Last name', email: 'Email', phone: 'Phone', requests: 'Special requests',
    requestsHelp: 'Allergies, accessibility, high chairs or anything else we should know. Up to 300 characters.',
    occasion: 'Occasion', occasions: { birthday: 'Birthday', anniversary: 'Anniversary', business: 'Business dinner', date: 'Date night', other: 'Other' },
    submit: 'Confirm reservation', submitting: 'Reserving', modifyTitle: 'Change your reservation', modifySubmit: 'Save changes',
    failed: 'We could not complete the reservation. Check your connection and try again.',
    summary: 'Your reservation', notSelected: 'Not chosen yet', offerApplied: 'Offer selected: {name}',
  },
  confirm: {
    title: 'Your table is reserved.', updated: 'Your reservation has been updated.',
    number: 'Reservation number', date: 'Date', time: 'Time', guests: 'Guests', seating: 'Seating', status: 'Status',
    confirmedDemo: 'Confirmed (demo)', requests: 'Special requests', noRequests: 'None',
    addCalendar: 'Add to calendar', manage: 'Manage reservation', where: 'Where to find us',
    emptyTitle: 'No reservation to show', emptyBody: 'Book a table and your confirmation will appear here.',
    note: 'We will see you soon. Please arrive within 15 minutes of your time. In this demo, nothing is sent by email or SMS.',
  },
  my: {
    title: 'My reservation',
    intro: 'The reservation you made on this device.',
    emptyTitle: 'You have no upcoming reservation', emptyBody: 'Choose a date and a time to book your table.',
    modify: 'Change reservation', cancel: 'Cancel reservation', cancelTitle: 'Cancel this reservation?',
    cancelBody: 'Your table will be released. You can book again at any time.', cancelConfirm: 'Yes, cancel it', keep: 'Keep reservation',
    cancelledTitle: 'Reservation cancelled', cancelledBody: 'Your table has been released.', bookAgain: 'Book another table',
    demoExplain: 'This is a demonstration. The reservation exists only in this browser, so clearing site data removes it. A real version would store it with the restaurant and send confirmations.',
    statusConfirmed: 'Confirmed (demo)', statusCancelled: 'Cancelled', cancelling: 'Cancelling',
  },
  events: {
    title: 'Events', intro: 'Tasting evenings, chef\u2019s counters and seasonal dinners. Seats are limited, so we keep them small.',
    seatsLeft: '{n} seats left', soldOut: 'Sold out',
    soldOutBody: 'All seats have been taken. Write to us to join the waiting list.',
    book: 'Reserve seats', details: 'About the evening', location: 'Where', highlights: 'What to expect', otherEvents: 'Other events',
    seats: 'Seats', yourName: 'Your name', yourEmail: 'Email', hold: 'Hold seats',
    holdSuccess: 'Seats held (demo)', holdSuccessBody: '{n} seats for {event} are held in this browser for the demo.',
    joinWaitlist: 'Join the waiting list',
  },
  offers: { title: 'Offers', intro: 'A few reasons to come at a different time of the week.', valid: 'Valid {from} to {to}', terms: 'Terms', claim: 'Book with this offer' },
  gallery: {
    title: 'Gallery', intro: 'Dishes, rooms and the people who make them.',
    categories: { all: 'All', food: 'Food', restaurant: 'Restaurant', chef: 'Chef', events: 'Events', atmosphere: 'Atmosphere' },
    prev: 'Previous image', next: 'Next image', closeLightbox: 'Close image', counter: '{n} of {total}', open: 'Open image: {alt}',
    note: 'Images on this demo are generated illustrations that stand in for photography.',
  },
  reviews: {
    title: 'Reviews', intro: 'What our guests have written. These are sample reviews for this demonstration.',
    overall: 'Overall rating', totalReviews: '{n} reviews', filterAll: 'All ratings', starsLabel: '{n} out of 5 stars',
    sort: 'Sort by', newest: 'Newest', highest: 'Highest rated', lowest: 'Lowest rated',
    noneTitle: 'No reviews with this rating', noneBody: 'Show all ratings to see every review.', showAll: 'Show all reviews',
  },
  contact: {
    title: 'Contact', intro: 'Ask a question, plan a private dinner or tell us about an allergy. We reply within one working day.',
    formTitle: 'Write to us',
    form: {
      name: 'Name', email: 'Email', phone: 'Phone (optional)', subject: 'Subject', message: 'Message', send: 'Send message', sending: 'Sending',
      successTitle: 'Message sent', successBody: 'Thank you, {name}. In a real version, Zineb\u2019s team would reply within one working day. Nothing was sent in this demo.',
      again: 'Send another message', failed: 'Your message could not be sent. Please try again.',
    },
    directionsTitle: 'Getting here', faqTitle: 'Common questions', faqMore: 'All questions', social: 'Follow us',
  },
  faq: {
    title: 'Frequently asked questions', intro: 'Quick answers about booking, visiting and eating with us.',
    categories: { reservations: 'Reservations', visiting: 'Visiting', dining: 'Dining and dietary needs' },
    still: 'Did not find your answer?',
  },
  favorites: {
    title: 'Your favourites', intro: 'Dishes you saved while browsing the menu. They stay on this device.',
    emptyTitle: 'No favourites yet', emptyBody: 'Tap the heart on any dish to save it here.', browse: 'Browse the menu',
  },
  about: {
    title: 'About Maison Ember', intro: 'A family of cooks, growers and wine people on Rue Oued Fès, since 2016.',
    philosophyTitle: 'How we cook', chefTitle: 'Chef\u2019s note', teamTitle: 'The people behind the pass',
    ingredientsTitle: 'Where our food comes from', sustainabilityTitle: 'Doing it carefully', atmosphereTitle: 'The rooms',
    awardsTitle: 'Recognition', timelineTitle: 'Ten years in brief', specialties: 'Specialities', experience: 'Experience',
    chefQuote: 'I want people to taste the fire, then forget about it and talk to each other.',
  },
  errors: {
    required: 'This field is required.', email: 'Enter a valid email address, like name@example.com.',
    phone: 'Enter a valid phone number, using digits and an optional +.', tooShort: 'Please write a little more.',
    tooLong: 'Please keep this under {n} characters.', summary: 'Please correct the highlighted fields.',
  },
  notFound: {
    title: 'This table is not on our floor plan',
    body: 'The page you are looking for does not exist or has moved. Let us help you find your way.',
    home: 'Back to home', menu: 'See the menu',
  },
  footer: {
    blurb: 'Contemporary Mediterranean cooking around a wood-fired hearth.',
    explore: 'Explore', visit: 'Visit', hoursTitle: 'Opening hours',
    rights: '\u00a9 {year} Maison Ember. A fictional restaurant created for demonstration.',
    demo: 'Demonstration website. All content, prices and reservations are mock data.',
  },
}

export type Dictionary = typeof en
type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] }

/* French and Arabic cover navigation, booking, forms and shared UI.
   Anything not translated falls back to English (see getDictionary). */
const fr: DeepPartial<Dictionary> = {
  meta: { siteTitle: 'Maison Ember | Restaurant méditerranéen contemporain à Rabat' },
  nav: {
    home: 'Accueil', menu: 'Carte', about: 'À propos', events: 'Événements', gallery: 'Galerie', reviews: 'Avis', contact: 'Contact',
    offers: 'Offres', faq: 'FAQ', favorites: 'Favoris', reserve: 'Réserver une table', reserveShort: 'Réserver',
    openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu', skip: 'Aller au contenu', main: 'Navigation principale',
    language: 'Langue', callUs: 'Appelez-nous', myReservation: 'Ma réservation',
  },
  status: { open: 'Ouvert', closed: 'Fermé', closesAt: 'jusqu\u2019à {time}', opensToday: 'Ouvre aujourd\u2019hui à {time}', opensDay: 'Ouvre {day} à {time}' },
  common: {
    viewDetails: 'Voir le détail', close: 'Fermer', back: 'Retour', continue: 'Continuer', reset: 'Réinitialiser', tryAgain: 'Réessayer',
    guestOne: '1 convive', guestMany: '{n} convives', demo: 'Réservation de démonstration',
    demoDisclaimer: 'Ceci est un site de démonstration. Aucune table n\u2019est réservée et aucun message n\u2019est envoyé.',
    follow: 'Suivez notre histoire', directions: 'Itinéraire', callRestaurant: 'Appeler le restaurant', address: 'Adresse',
    hours: 'Horaires', phone: 'Téléphone', email: 'E-mail', closedDay: 'Fermé', viewAll: 'Tout voir', reserveTable: 'Réserver une table',
    perPerson: 'par personne', readMore: 'Lire la suite', backToMenu: 'Retour à la carte', loading: 'Chargement',
  },
  hero: {
    title: 'Cuit au feu. Fait pour s\u2019attarder.',
    body: 'Une cuisine méditerranéenne contemporaine autour d\u2019un seul foyer à bois, au cœur d\u2019Agdal, à Rabat.',
    explore: 'Découvrir la carte', scroll: 'Défiler',
  },
  home: {
    signatureTitle: 'Trois assiettes qui font notre réputation', introLink: 'Lire notre histoire', experienceTitle: 'Plus qu\u2019une table',
    menuTitle: 'La saison en cuisine', menuCta: 'Voir toute la carte', reserveTitle: 'Votre table vous attend.',
    reserveBody: 'Choisissez une date, nous vous montrons les disponibilités.', reserveCta: 'Trouver une table',
    reviewsTitle: 'Ce que nos convives écrivent', reviewsCta: 'Lire tous les avis', eventsTitle: 'Des soirées à prévoir',
    eventsCta: 'Tous les événements', galleryTitle: 'La salle et le feu', locationTitle: 'Retrouvez-nous à Agdal',
    date: 'Date', time: 'Heure', guests: 'Convives', anyTime: 'Peu importe',
    closedMonday: 'Nous sommes fermés le lundi. Choisissez une autre date.', pickDate: 'Choisir une date',
  },
  menu: {
    title: 'La carte', search: 'Rechercher un plat ou un ingrédient', searchLabel: 'Rechercher dans la carte',
    categories: { all: 'Tout', starters: 'Entrées', salads: 'Salades', mains: 'Plats', seafood: 'Mer', meat: 'Viandes', vegetarian: 'Végétarien', desserts: 'Desserts', drinks: 'Boissons', wine: 'Vins' },
    filters: 'Filtres', price: 'Prix', priceAny: 'Tous les prix', priceUnder: 'Moins de {n}', priceMid: '{a} à {b}', priceOver: 'Plus de {n}',
    dietary: 'Régime', spicy: 'Épicé', chefsChoice: 'Choix du chef', sort: 'Trier par', sortRecommended: 'Recommandés',
    sortPriceAsc: 'Prix croissant', sortPriceDesc: 'Prix décroissant', sortPopular: 'Les plus populaires',
    results: '{n} plats', resultsOne: '1 plat', noResultsTitle: 'Aucun plat ne correspond',
    noResultsBody: 'Retirez un filtre ou cherchez un ingrédient comme l\u2019agneau, la figue ou le safran.', clearFilters: 'Effacer les filtres',
    popular: 'Coup de cœur', unavailable: 'Indisponible ce soir', ingredients: 'Ingrédients', allergens: 'Allergènes', noAllergens: 'Aucun déclaré',
    calories: 'Calories', pairing: 'Accord conseillé', chefNote: 'Le conseil du chef', dietaryInfo: 'Régime', openFull: 'Ouvrir la page',
    favoriteAdd: 'Ajouter aux favoris', favoriteRemove: 'Retirer des favoris',
  },
  dietary: { vegetarian: 'Végétarien', vegan: 'Vegan', 'gluten-free': 'Sans gluten', spicy: 'Épicé', chef: 'Signature du chef' },
  allergens: { gluten: 'gluten', dairy: 'lait', eggs: 'œufs', fish: 'poisson', shellfish: 'crustacés', nuts: 'fruits à coque', sesame: 'sésame', sulphites: 'sulfites', soy: 'soja', celery: 'céleri', mustard: 'moutarde' },
  reserve: {
    title: 'Réserver une table',
    steps: { date: 'Date', guests: 'Convives', time: 'Heure', seating: 'Place', details: 'Vos coordonnées' }, stepOf: 'Étape {n} sur {total}',
    dateTitle: 'Quel jour souhaitez-vous venir ?', dateHelp: 'Nous sommes fermés le lundi.', closedLabel: 'fermé',
    prevMonth: 'Mois précédent', nextMonth: 'Mois suivant', guestsTitle: 'Combien de convives ?',
    largeParty: 'À partir de 15 personnes, contactez-nous pour organiser une privatisation.', timeTitle: 'Choisissez une heure',
    timeHelp: 'Les horaires barrés sont complets.', lunch: 'Déjeuner', dinner: 'Dîner', slotUnavailable: 'indisponible', loadingSlots: 'Vérification des disponibilités',
    noSlotsClosedTitle: 'Pas de service ce jour-là', noSlotsClosedBody: 'Le restaurant est fermé le lundi. Choisissez une autre date.',
    noSlotsFullTitle: 'Cette date est complète', noSlotsFullBody: 'Aucune table n\u2019est libre pour votre groupe. Essayez la veille ou le lendemain.', chooseAnother: 'Choisir une autre date',
    seatingTitle: 'Où souhaitez-vous vous installer ?', seatingNeeds: 'Pour {min} à {max} convives', seatingUnavailable: 'Indisponible à cette heure',
    seating: {
      main: { name: 'Salle principale', desc: 'Le cœur du restaurant, face au foyer.' },
      terrace: { name: 'Terrasse', desc: 'À l\u2019ombre et aux lanternes, idéale aux beaux soirs.' },
      private: { name: 'Salon privé', desc: 'Une salle séparée avec entrée dédiée et serveur attitré.' },
      bar: { name: 'Bar', desc: 'Places informelles face au bar, parfaites pour deux.' },
    },
    detailsTitle: 'Pour qui est la table ?', firstName: 'Prénom', lastName: 'Nom', email: 'E-mail', phone: 'Téléphone', requests: 'Demandes particulières',
    occasion: 'Occasion', occasions: { birthday: 'Anniversaire', anniversary: 'Anniversaire de mariage', business: 'Dîner d\u2019affaires', date: 'Dîner en amoureux', other: 'Autre' },
    submit: 'Confirmer la réservation', submitting: 'Réservation en cours', modifyTitle: 'Modifier votre réservation', modifySubmit: 'Enregistrer',
    failed: 'La réservation n\u2019a pas pu aboutir. Réessayez.', summary: 'Votre réservation', notSelected: 'Pas encore choisi',
  },
  confirm: {
    title: 'Votre table est réservée.', updated: 'Votre réservation a été modifiée.', number: 'Numéro de réservation', date: 'Date', time: 'Heure',
    guests: 'Convives', seating: 'Place', status: 'Statut', confirmedDemo: 'Confirmée (démo)', requests: 'Demandes particulières', noRequests: 'Aucune',
    addCalendar: 'Ajouter au calendrier', manage: 'Gérer la réservation', where: 'Où nous trouver',
    emptyTitle: 'Aucune réservation à afficher', emptyBody: 'Réservez une table et votre confirmation apparaîtra ici.',
  },
  my: {
    title: 'Ma réservation', emptyTitle: 'Aucune réservation à venir', emptyBody: 'Choisissez une date et une heure pour réserver.',
    modify: 'Modifier', cancel: 'Annuler la réservation', cancelTitle: 'Annuler cette réservation ?', cancelBody: 'Votre table sera libérée.',
    cancelConfirm: 'Oui, annuler', keep: 'Conserver', cancelledTitle: 'Réservation annulée', cancelledBody: 'Votre table a été libérée.', bookAgain: 'Réserver une autre table',
    statusConfirmed: 'Confirmée (démo)', statusCancelled: 'Annulée',
  },
  errors: {
    required: 'Ce champ est obligatoire.', email: 'Saisissez une adresse e-mail valide.', phone: 'Saisissez un numéro de téléphone valide.',
    tooShort: 'Merci d\u2019en écrire un peu plus.', tooLong: 'Merci de rester sous {n} caractères.', summary: 'Veuillez corriger les champs signalés.',
  },
  notFound: { title: 'Cette table n\u2019est pas sur notre plan', body: 'La page demandée n\u2019existe pas ou a été déplacée.', home: 'Retour à l\u2019accueil', menu: 'Voir la carte' },
  footer: { explore: 'Explorer', visit: 'Nous trouver', hoursTitle: 'Horaires', blurb: 'Cuisine méditerranéenne contemporaine autour d\u2019un foyer à bois.' },
}

const ar: DeepPartial<Dictionary> = {
  meta: { siteTitle: 'ميزون إمبر | مطعم متوسطي معاصر في الرباط' },
  nav: {
    home: 'الرئيسية', menu: 'القائمة', about: 'من نحن', events: 'الفعاليات', gallery: 'المعرض', reviews: 'التقييمات', contact: 'اتصل بنا',
    offers: 'العروض', faq: 'الأسئلة الشائعة', favorites: 'المفضلة', reserve: 'احجز طاولة', reserveShort: 'احجز',
    openMenu: 'فتح القائمة', closeMenu: 'إغلاق القائمة', skip: 'انتقل إلى المحتوى', main: 'التنقل الرئيسي', language: 'اللغة',
    callUs: 'اتصل بنا', myReservation: 'حجزي',
  },
  status: { open: 'مفتوح الآن', closed: 'مغلق', closesAt: 'حتى {time}', opensToday: 'يفتح اليوم في {time}', opensDay: 'يفتح {day} في {time}' },
  common: {
    viewDetails: 'عرض التفاصيل', close: 'إغلاق', back: 'رجوع', continue: 'متابعة', reset: 'إعادة ضبط', tryAgain: 'حاول مرة أخرى',
    guestOne: 'ضيف واحد', guestMany: '{n} ضيوف', demo: 'حجز تجريبي',
    demoDisclaimer: 'هذا موقع تجريبي. لا يتم حجز أي طاولة فعلياً ولا تُرسل أي رسالة.',
    follow: 'تابعوا رحلتنا', directions: 'الاتجاهات', callRestaurant: 'اتصل بالمطعم', address: 'العنوان', hours: 'ساعات العمل',
    phone: 'الهاتف', email: 'البريد الإلكتروني', closedDay: 'مغلق', viewAll: 'عرض الكل', reserveTable: 'احجز طاولة',
    perPerson: 'للشخص', readMore: 'اقرأ المزيد', backToMenu: 'العودة إلى القائمة', loading: 'جارٍ التحميل',
  },
  hero: {
    title: 'يُطهى على النار. ويُستمتع به على مهل.',
    body: 'مطبخ متوسطي معاصر حول موقد واحد يعمل بالحطب، في قلب أكدال بالرباط.',
    explore: 'استكشف القائمة', scroll: 'مرّر',
  },
  home: {
    signatureTitle: 'ثلاثة أطباق نُعرف بها', introLink: 'اقرأ قصتنا', experienceTitle: 'أكثر من مجرد طاولة', menuTitle: 'موسمنا في المطبخ',
    menuCta: 'عرض القائمة كاملة', reserveTitle: 'طاولتك بانتظارك.', reserveBody: 'اختر تاريخاً وسنُظهر لك المواعيد المتاحة.', reserveCta: 'ابحث عن طاولة',
    reviewsTitle: 'ما يكتبه ضيوفنا', reviewsCta: 'قراءة كل التقييمات', eventsTitle: 'أمسيات تستحق التخطيط', eventsCta: 'كل الفعاليات',
    galleryTitle: 'من القاعة والنار', locationTitle: 'تجدوننا في أكدال', date: 'التاريخ', time: 'الوقت', guests: 'الضيوف', anyTime: 'أي وقت',
    closedMonday: 'نحن مغلقون أيام الاثنين. يرجى اختيار تاريخ آخر.', pickDate: 'اختر تاريخاً',
  },
  menu: {
    title: 'القائمة', search: 'ابحث عن طبق أو مكوّن', searchLabel: 'البحث في القائمة',
    categories: { all: 'الكل', starters: 'المقبلات', salads: 'السلطات', mains: 'الأطباق الرئيسية', seafood: 'المأكولات البحرية', meat: 'اللحوم', vegetarian: 'نباتي', desserts: 'الحلويات', drinks: 'المشروبات', wine: 'النبيذ' },
    filters: 'التصفية', price: 'السعر', priceAny: 'أي سعر', priceUnder: 'أقل من {n}', priceMid: 'من {a} إلى {b}', priceOver: 'أكثر من {n}',
    dietary: 'النظام الغذائي', spicy: 'حار', chefsChoice: 'اختيار الشيف', sort: 'ترتيب حسب', sortRecommended: 'الموصى به',
    sortPriceAsc: 'السعر: من الأقل', sortPriceDesc: 'السعر: من الأعلى', sortPopular: 'الأكثر طلباً', results: '{n} أطباق', resultsOne: 'طبق واحد',
    noResultsTitle: 'لا توجد أطباق مطابقة', noResultsBody: 'جرّب إزالة أحد الفلاتر أو البحث عن مكوّن مثل الضأن أو التين أو الزعفران.',
    clearFilters: 'مسح الفلاتر', popular: 'المفضل لدى الضيوف', unavailable: 'غير متوفر الليلة', ingredients: 'المكونات', allergens: 'مسببات الحساسية',
    noAllergens: 'لا شيء معلن', calories: 'السعرات', pairing: 'التوفيق المقترح', chefNote: 'توصية الشيف', dietaryInfo: 'النظام الغذائي',
    openFull: 'فتح الصفحة', favoriteAdd: 'أضف إلى المفضلة', favoriteRemove: 'إزالة من المفضلة',
  },
  dietary: { vegetarian: 'نباتي', vegan: 'نباتي صرف', 'gluten-free': 'خالٍ من الغلوتين', spicy: 'حار', chef: 'توقيع الشيف' },
  allergens: { gluten: 'غلوتين', dairy: 'ألبان', eggs: 'بيض', fish: 'سمك', shellfish: 'محار وقشريات', nuts: 'مكسرات', sesame: 'سمسم', sulphites: 'كبريتيت', soy: 'صويا', celery: 'كرفس', mustard: 'خردل' },
  reserve: {
    title: 'احجز طاولة',
    steps: { date: 'التاريخ', guests: 'الضيوف', time: 'الوقت', seating: 'المقعد', details: 'بياناتك' }, stepOf: 'الخطوة {n} من {total}',
    dateTitle: 'في أي يوم تودّ الحضور؟', dateHelp: 'نحن مغلقون أيام الاثنين.', closedLabel: 'مغلق', prevMonth: 'الشهر السابق', nextMonth: 'الشهر التالي',
    guestsTitle: 'كم عدد الضيوف؟', largeParty: 'للمجموعات من 15 شخصاً فأكثر، يرجى التواصل معنا.', timeTitle: 'اختر الوقت',
    timeHelp: 'الأوقات المشطوبة محجوزة بالكامل.', lunch: 'الغداء', dinner: 'العشاء', slotUnavailable: 'غير متاح', loadingSlots: 'جارٍ التحقق من التوفر',
    noSlotsClosedTitle: 'لا خدمة في هذا اليوم', noSlotsClosedBody: 'المطعم مغلق أيام الاثنين. يرجى اختيار تاريخ آخر.',
    noSlotsFullTitle: 'هذا التاريخ محجوز بالكامل', noSlotsFullBody: 'لا توجد طاولات شاغرة لمجموعتك. جرّب اليوم السابق أو التالي.', chooseAnother: 'اختر تاريخاً آخر',
    seatingTitle: 'أين تفضّل الجلوس؟', seatingNeeds: 'من {min} إلى {max} ضيوف', seatingUnavailable: 'غير متاح في هذا الوقت',
    seating: {
      main: { name: 'قاعة الطعام الرئيسية', desc: 'قلب المطعم، مع إطلالة على الموقد.' },
      terrace: { name: 'الشرفة', desc: 'مظللة ومضاءة بالفوانيس، ومثالية للأمسيات اللطيفة.' },
      private: { name: 'قاعة خاصة', desc: 'قاعة منفصلة بمدخل خاص ونادل مخصص.' },
      bar: { name: 'البار', desc: 'مقاعد غير رسمية أمام البار، مناسبة لشخصين.' },
    },
    detailsTitle: 'باسم من الطاولة؟', firstName: 'الاسم الأول', lastName: 'اسم العائلة', email: 'البريد الإلكتروني', phone: 'الهاتف', requests: 'طلبات خاصة',
    occasion: 'المناسبة', occasions: { birthday: 'عيد ميلاد', anniversary: 'ذكرى سنوية', business: 'عشاء عمل', date: 'عشاء رومانسي', other: 'أخرى' },
    submit: 'تأكيد الحجز', submitting: 'جارٍ الحجز', modifyTitle: 'تعديل حجزك', modifySubmit: 'حفظ التغييرات',
    failed: 'تعذّر إكمال الحجز. حاول مرة أخرى.', summary: 'حجزك', notSelected: 'لم يُختر بعد',
  },
  confirm: {
    title: 'تم حجز طاولتك.', updated: 'تم تحديث حجزك.', number: 'رقم الحجز', date: 'التاريخ', time: 'الوقت', guests: 'الضيوف', seating: 'المقعد',
    status: 'الحالة', confirmedDemo: 'مؤكد (تجريبي)', requests: 'طلبات خاصة', noRequests: 'لا شيء', addCalendar: 'أضف إلى التقويم',
    manage: 'إدارة الحجز', where: 'كيف تجدوننا', emptyTitle: 'لا يوجد حجز لعرضه', emptyBody: 'احجز طاولة وسيظهر التأكيد هنا.',
  },
  my: {
    title: 'حجزي', emptyTitle: 'لا يوجد حجز قادم', emptyBody: 'اختر تاريخاً ووقتاً لحجز طاولتك.', modify: 'تعديل الحجز', cancel: 'إلغاء الحجز',
    cancelTitle: 'هل تريد إلغاء هذا الحجز؟', cancelBody: 'سيتم تحرير طاولتك.', cancelConfirm: 'نعم، ألغِ الحجز', keep: 'الإبقاء على الحجز',
    cancelledTitle: 'تم إلغاء الحجز', cancelledBody: 'تم تحرير طاولتك.', bookAgain: 'احجز طاولة أخرى', statusConfirmed: 'مؤكد (تجريبي)', statusCancelled: 'ملغى',
  },
  errors: {
    required: 'هذا الحقل مطلوب.', email: 'أدخل بريداً إلكترونياً صحيحاً.', phone: 'أدخل رقم هاتف صحيحاً.', tooShort: 'يرجى كتابة المزيد.',
    tooLong: 'يرجى ألا يتجاوز {n} حرفاً.', summary: 'يرجى تصحيح الحقول المحددة.',
  },
  notFound: { title: 'هذه الطاولة ليست على مخططنا', body: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.', home: 'العودة إلى الرئيسية', menu: 'عرض القائمة' },
  footer: { explore: 'استكشف', visit: 'زيارتنا', hoursTitle: 'ساعات العمل', blurb: 'مطبخ متوسطي معاصر حول موقد يعمل بالحطب.' },
}

function merge<T extends object>(base: T, over: DeepPartial<T>): T {
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
  for (const [key, value] of Object.entries(over as Record<string, unknown>)) {
    if (value === undefined) continue
    const current = out[key]
    out[key] =
      value && typeof value === 'object' && current && typeof current === 'object'
        ? merge(current as object, value as DeepPartial<object>)
        : value
  }
  return out as T
}

const overrides: Record<Locale, DeepPartial<Dictionary>> = { en: {}, fr, ar }

export function getDictionary(locale: Locale): Dictionary {
  return merge(en, overrides[locale])
}
