import { Skeleton } from '@/components/ui/Skeleton'

export default function ReservationsLoading() {
  return (
    <div className="container-x py-40" aria-busy="true">
      <Skeleton className="h-12 w-1/2" />
      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <Skeleton className="h-96 lg:col-span-7" />
        <Skeleton className="h-72 lg:col-span-5" />
      </div>
    </div>
  )
}
