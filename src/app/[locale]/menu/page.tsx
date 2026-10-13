import { MenuExplorer } from '@/components/menu/MenuExplorer'
import { PageHero } from '@/components/ui/PageHero'
import { menuItems } from '@/data/menu'
import { pageMetadata, resolveLocale, type LocaleParams } from '@/lib/page'

export const generateMetadata = pageMetadata('/menu', 'menu', 'menu')

export default async function MenuPage({ params }: LocaleParams) {
  const { t } = await resolveLocale(params)
  return (
    <>
      <PageHero title={t.menu.title} intro={t.menu.intro} />
      <MenuExplorer items={menuItems} />
    </>
  )
}
