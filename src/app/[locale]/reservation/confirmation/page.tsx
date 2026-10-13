import { PageHero } from '@/components/ui/PageHero'
import { ConfirmationView } from '@/components/reservation/ConfirmationView'
import { pageMetadata, resolveLocale, type LocaleParams } from '@/lib/page'

export const generateMetadata = pageMetadata('/reservation/confirmation', 'confirmation', 'myReservation', true)

export default async function ConfirmationPage({ params, searchParams }: LocaleParams & { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { t } = await resolveLocale(params)
  const sp = await searchParams
  return (
    <>
      <PageHero title={t.nav.myReservation} />
      <ConfirmationView updated={sp.updated === '1'} />
    </>
  )
}
