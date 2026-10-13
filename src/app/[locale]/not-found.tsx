'use client'

import { useApp } from '@/components/providers/AppProvider'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'

export default function LocaleNotFound() {
  const { t, href } = useApp()
  return (
    <PageHero title={t.notFound.title} intro={t.notFound.body}>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={href('/')}>{t.notFound.home}</ButtonLink>
        <ButtonLink href={href('/menu')} variant="outlineLight">{t.notFound.menu}</ButtonLink>
      </div>
    </PageHero>
  )
}
