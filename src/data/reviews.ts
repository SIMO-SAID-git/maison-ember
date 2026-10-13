import type { Review } from '@/types'

export const reviews: Review[] = [
  { id: 'r1', author: 'Salma B.', rating: 5, date: '2026-10-03', title: 'The best sea bass I have had in Rabat',
    body: 'We went for my sister\u2019s birthday and the table was ready exactly when they said. The sea bass was cooked perfectly and the staff mentioned the wine pairing without pushing it. Dessert was the fondant, as everyone told us.',
    visit: 'Birthday dinner', featured: true },
  { id: 'r2', author: 'Thomas Verhoeven', rating: 5, date: '2026-09-27', title: 'Worth planning a trip around',
    body: 'Visiting from Rotterdam for work. The lamb shoulder fell apart at the touch of a fork and the apricot sauce was not too sweet. Aurélien recommended a Syrah from Meknès that I will now be looking for at home.',
    visit: 'Dinner for two', featured: true },
  { id: 'r3', author: 'Yasmine El Idrissi', rating: 4, date: '2026-09-21', title: 'Lovely lunch, slightly rushed',
    body: 'The weekday lunch is great value and the cauliflower starter is the best thing I\u2019ve eaten this month. Service was quick, a little too quick for a long catch-up with a friend. We asked and they slowed down.',
    visit: 'Weekday lunch' },
  { id: 'r4', author: 'Hugo Lambert', rating: 5, date: '2026-09-14', title: 'Chef\u2019s counter is something special',
    body: 'Eight seats in front of the fire and Mehdi talking through each course. We left at midnight and nobody checked a watch. Book early.',
    visit: 'Chef\u2019s counter', featured: true },
  { id: 'r5', author: 'Nadia K.', rating: 3, date: '2026-09-09', title: 'Good food, noisy room',
    body: 'The food is excellent but on a full Saturday night the main room is loud and we struggled to hear each other. The staff moved us to the terrace when we asked, which helped. I would book the terrace next time.',
    visit: 'Saturday dinner' },
  { id: 'r6', author: 'Rachid Alaoui', rating: 5, date: '2026-08-30', title: 'A proper family Sunday lunch',
    body: 'Three generations at one table. They found a high chair for the baby and the kefta was a hit with the kids. My father, who is hard to please, asked for the lamb recipe.',
    visit: 'Sunday lunch' },
  { id: 'r7', author: 'Camille Dupont', rating: 4, date: '2026-08-22', title: 'Great vegetarian options',
    body: 'Rare to find a vegetarian main that isn\u2019t an afterthought. The roasted aubergine was properly seasoned and hearty. The Wellington was good but a little dry at the edges.',
    visit: 'Dinner with friends' },
  { id: 'r8', author: 'Sophie Marchetti', rating: 5, date: '2026-08-15', title: 'Anniversary done right',
    body: 'They knew it was our anniversary, gave us the table by the window and sent out a glass of Champagne without making a fuss. Quiet, warm, unhurried.',
    visit: 'Anniversary' },
  { id: 'r9', author: 'Omar B.', rating: 4, date: '2026-08-02', title: 'Excellent wine list',
    body: 'Came for the wine pairing on a Thursday. Three glasses, each explained briefly and well. The dishes were slightly smaller than I expected, but I left satisfied.',
    visit: 'Thursday pairing' },
  { id: 'r10', author: 'Ingrid Solberg', rating: 2, date: '2026-07-26', title: 'Long wait for the main course',
    body: 'Starters arrived quickly but we waited nearly fifty minutes for the mains. The manager apologised and took the desserts off the bill, which we appreciated. The food, when it came, was very good.',
    visit: 'Friday dinner' },
  { id: 'r11', author: 'Karim T.', rating: 5, date: '2026-07-18', title: 'Business dinner that went well',
    body: 'Booked the private room for eight clients. Zineb helped us plan the menu in advance and service was discreet. Two guests asked for the restaurant\u2019s name before we had left.',
    visit: 'Private dining' },
  { id: 'r12', author: 'Leïla Mansouri', rating: 4, date: '2026-07-05', title: 'Terrace in summer',
    body: 'The terrace at dusk is one of the nicest places to eat in the city. Sardines and a cold glass of gris, nothing more needed. Mosquitoes were a slight nuisance after 21:00.',
    visit: 'Terrace dinner' },
]

export function ratingStats(list: Review[] = reviews) {
  const total = list.length
  const average = total ? list.reduce((s, r) => s + r.rating, 0) / total : 0
  const distribution = ([5, 4, 3, 2, 1] as const).map((stars) => ({
    stars,
    count: list.filter((r) => r.rating === stars).length,
  }))
  return { total, average, distribution }
}
