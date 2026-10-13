import { Skeleton } from '@/components/ui/Skeleton'

export default function EventsLoading() {
  return (
    <div className="container-x py-40" aria-busy="true">
      <Skeleton className="h-12 w-1/3" />
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {[0, 1, 2].map((i) => <div key={i}><Skeleton className="aspect-[5/4] w-full" /><Skeleton className="mt-4 h-6 w-2/3" /></div>)}
      </div>
    </div>
  )
}
