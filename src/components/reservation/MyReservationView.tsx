'use client'

import { useState } from 'react'
import { CalendarX, Loader2 } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { Badge } from '@/components/ui/Badge'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { ReservationDetails } from '@/components/reservation/ReservationDetails'
import { cancelReservation } from '@/lib/api/reservations'

export function MyReservationView() {
  const { t, href, reservation, saveReservation, hydrated } = useApp()
  const [confirming, setConfirming] = useState(false)
  const [busy, setBusy] = useState(false)

  if (!hydrated) return <div className="container-x py-14"><Skeleton className="h-96 max-w-2xl" /></div>

  if (!reservation) {
    return (
      <div className="container-x py-14">
        <EmptyState icon={<CalendarX className="h-10 w-10" />} title={t.my.emptyTitle}>
          <p>{t.my.emptyBody}</p>
          <ButtonLink href={href('/reservations')} className="mt-6">{t.common.reserveTable}</ButtonLink>
        </EmptyState>
      </div>
    )
  }

  const cancelled = reservation.status === 'cancelled'
  const doCancel = async () => {
    setBusy(true)
    const result = await cancelReservation(reservation)
    saveReservation(result)
    setBusy(false)
    setConfirming(false)
  }

  return (
    <div className="container-x py-12 lg:py-16">
      <div className="max-w-2xl">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="accent">{t.common.demo}</Badge>
          <Badge tone={cancelled ? 'dark' : 'neutral'}>{cancelled ? t.my.statusCancelled : t.my.statusConfirmed}</Badge>
        </div>
        {cancelled && (
          <div role="status" className="mt-6">
            <h2 className="font-display text-3xl font-light">{t.my.cancelledTitle}</h2>
            <p className="mt-2 text-mute">{t.my.cancelledBody}</p>
          </div>
        )}
        <div className={cancelled ? 'mt-6 rounded-md bg-chalk-100 p-6 opacity-70 sm:p-8' : 'mt-6 rounded-md bg-chalk-100 p-6 sm:p-8'}>
          <ReservationDetails reservation={reservation} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {cancelled ? (
            <ButtonLink href={href('/reservations')}>{t.my.bookAgain}</ButtonLink>
          ) : (
            <>
              <ButtonLink href={href('/reservations?modify=1')} variant="dark">{t.my.modify}</ButtonLink>
              <Button variant="outline" onClick={() => setConfirming(true)}>{t.my.cancel}</Button>
            </>
          )}
        </div>
        <p className="mt-8 border-s-2 border-saffron ps-4 text-sm leading-relaxed text-mute">{t.my.demoExplain}</p>
      </div>

      <Dialog open={confirming} onClose={() => !busy && setConfirming(false)} label={t.my.cancelTitle} showClose={false} className="sm:max-w-md">
        <div className="p-7">
          <h2 className="font-display text-3xl font-light">{t.my.cancelTitle}</h2>
          <p className="mt-3 text-mute">{t.my.cancelBody}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="dark" onClick={doCancel} disabled={busy}>
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              {busy ? t.my.cancelling : t.my.cancelConfirm}
            </Button>
            <Button variant="outline" onClick={() => setConfirming(false)} disabled={busy}>{t.my.keep}</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
