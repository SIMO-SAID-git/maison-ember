import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { PageHero } from '@/components/ui/PageHero'
import { gallery } from '@/data/gallery'
import { pageMetadata, resolveLocale, type LocaleParams } from '@/lib/page'

export const generateMetadata = pageMetadata('/gallery', 'gallery', 'gallery')

export default async function GalleryPage({ params }: LocaleParams) {
  const { t } = await resolveLocale(params)
  return (
    <>
      <PageHero title={t.gallery.title} intro={t.gallery.intro} />
      <GalleryGrid images={gallery} />
    </>
  )
}
