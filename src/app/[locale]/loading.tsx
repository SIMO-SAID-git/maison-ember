import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className="dark-surface min-h-screen bg-deep">
      <div className="container-x space-y-6 pt-40" aria-busy="true">
        <Skeleton className="h-14 w-2/3 bg-chalk/10" />
        <Skeleton className="h-5 w-1/2 bg-chalk/10" />
        <Skeleton className="mt-16 h-72 w-full bg-chalk/10" />
      </div>
    </div>
  )
}
