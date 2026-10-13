import { PageHero } from '@/components/ui/PageHero'
import { ReservationFlow } from '@/components/reservation/ReservationFlow'
import { offers } from '@/data/offers'
import { reservationRules } from '@/data/reservations'
import { pageMetadata, resolveLocale, type LocaleParams } from '@/lib/page'

export const generateMetadata = pageMetadata('/reservations', 'reservations', 'reserve')

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function ReservationsPage({ params, searchParams }: LocaleParams & { searchParams: SearchParams }) {
  const { t } = await resolveLocale(params)
  const sp = await searchParams
  const one = (key: string) => {
    const v = sp[key]
    return Array.isArray(v) ? v[0] : v
  }
  const date = one('date')
  const guests = Number(one('guests'))
  const time = one('time')
  const offer = offers.find((o) => o.id === one('offer'))
  const mode = one('modify') === '1' ? 'modify' : 'new'

  const initial = {
    date: date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined,
    guests: Number.isInteger(guests) && guests >= 1 && guests <= reservationRules.maxGuests ? guests : undefined,
    time: time && /^\d{2}:\d{2}$/.test(time) ? time : undefined,
    requests: offer ? `Offer: ${offer.name}` : undefined,
    offerName: offer?.name,
  }

  return (
    <>
      <PageHero title={t.reserve.title} intro={t.reserve.intro} />
      <ReservationFlow mode={mode} initial={initial} />
    </>
  )
}
