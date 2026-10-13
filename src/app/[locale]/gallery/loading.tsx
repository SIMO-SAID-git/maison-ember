import { Skeleton } from '@/components/ui/Skeleton'

export default function GalleryLoading() {
  return (
    <div className="container-x py-40" aria-busy="true">
      <Skeleton className="h-12 w-1/3" />
      <div className="mt-12 columns-2 gap-3 lg:columns-3">
        {[0, 1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className={i % 2 ? 'mb-3 aspect-[3/4] w-full' : 'mb-3 aspect-[4/3] w-full'} />)}
      </div>
    </div>
  )
}
