import { PageHero } from '@/components/ui/PageHero'
import { MyReservationView } from '@/components/reservation/MyReservationView'
import { pageMetadata, resolveLocale, type LocaleParams } from '@/lib/page'

export const generateMetadata = pageMetadata('/reservation', 'reservation', 'myReservation', true)

export default async function MyReservationPage({ params }: LocaleParams) {
  const { t } = await resolveLocale(params)
  return (
    <>
      <PageHero title={t.my.title} intro={t.my.intro} />
      <MyReservationView />
    </>
  )
}
