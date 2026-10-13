import { Skeleton } from '@/components/ui/Skeleton'

export default function MenuLoading() {
  return (
    <div className="container-x py-40" aria-busy="true">
      <Skeleton className="h-12 w-1/2" />
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i}><Skeleton className="aspect-[4/3] w-full" /><Skeleton className="mt-4 h-6 w-2/3" /><Skeleton className="mt-2 h-4 w-full" /></div>
        ))}
      </div>
    </div>
  )
}
