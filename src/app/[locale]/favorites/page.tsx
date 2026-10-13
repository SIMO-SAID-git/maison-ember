import { FavoritesView } from '@/components/menu/FavoritesView'
import { PageHero } from '@/components/ui/PageHero'
import { menuItems } from '@/data/menu'
import { pageMetadata, resolveLocale, type LocaleParams } from '@/lib/page'

export const generateMetadata = pageMetadata('/favorites', 'favorites', 'favorites', true)

export default async function FavoritesPage({ params }: LocaleParams) {
  const { t } = await resolveLocale(params)
  return (
    <>
      <PageHero title={t.favorites.title} intro={t.favorites.intro} />
      <FavoritesView items={menuItems} />
    </>
  )
}
