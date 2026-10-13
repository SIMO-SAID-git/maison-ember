import { ReviewsExplorer } from '@/components/reviews/ReviewsExplorer'
import { PageHero } from '@/components/ui/PageHero'
import { reviews } from '@/data/reviews'
import { pageMetadata, resolveLocale, type LocaleParams } from '@/lib/page'

export const generateMetadata = pageMetadata('/reviews', 'reviews', 'reviews')

export default async function ReviewsPage({ params }: LocaleParams) {
  const { t } = await resolveLocale(params)
  return (
    <>
      <PageHero title={t.reviews.title} intro={t.reviews.intro} />
      <ReviewsExplorer reviews={reviews} />
    </>
  )
}
