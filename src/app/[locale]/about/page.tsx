import { Photo } from '@/components/ui/Photo'
import { PageHero } from '@/components/ui/PageHero'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ButtonLink } from '@/components/ui/Button'
import { team } from '@/data/team'
import { awards, philosophy, sourcing, story, sustainability, timeline } from '@/data/restaurant'
import { localizedPath } from '@/lib/i18n/config'
import { pageMetadata, resolveLocale, type LocaleParams } from '@/lib/page'

export const generateMetadata = pageMetadata('/about', 'about', 'about')

export default async function AboutPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params)
  const chef = team[0]
  return (
    <>
      <PageHero title={t.about.title} intro={t.about.intro} />

      <section className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="font-display text-4xl font-light leading-[1.05] sm:text-5xl">{story.headline}</h2>
            {story.paragraphs.map((p) => <p key={p.slice(0, 16)} className="mt-5 max-w-xl text-lg leading-relaxed text-mute">{p}</p>)}
          </div>
          <Photo src="/images/story.svg" alt="The hearth at Maison Ember in the hour before service" className="aspect-[5/4] rounded-[3px] lg:col-span-6" sizes="(min-width:1024px) 50vw, 100vw" />
        </div>
      </section>

      <section className="bg-chalk-200 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading title={t.about.philosophyTitle} />
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {philosophy.map((p) => (
              <li key={p.title}>
                <h3 className="font-display text-3xl">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-mute">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="dark-surface bg-deep py-20 text-chalk sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <Photo src={chef.image} alt={chef.imageAlt} className="aspect-[4/5] max-w-md rounded-[3px] lg:col-span-5" sizes="(min-width:1024px) 40vw, 100vw" />
          <div className="lg:col-span-7">
            <h2 className="text-sm text-saffron">{t.about.chefTitle}</h2>
            <blockquote className="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl">{t.about.chefQuote}</blockquote>
            <p className="mt-6 text-lg font-medium">{chef.name}, {chef.role}</p>
            <p className="mt-3 max-w-xl leading-relaxed text-chalk/75">{chef.bio}</p>
          </div>
        </div>
      </section>

      <section id="team" className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading title={t.about.teamTitle} />
          <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.id}>
                <Photo src={m.image} alt={m.imageAlt} className="aspect-[4/5] rounded-[3px]" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
                <h3 className="mt-5 font-display text-2xl">{m.name}</h3>
                <p className="text-[15px] text-zellige">{m.role}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-mute">{m.bio}</p>
                <p className="mt-3 text-sm"><span className="font-medium">{t.about.specialties}:</span> {m.specialties.join(', ')}</p>
                <p className="mt-1 text-sm"><span className="font-medium">{t.about.experience}:</span> {m.experience}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-chalk-200 py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading title={t.about.ingredientsTitle} />
            <ul className="mt-8 divide-y divide-deep/15 border-y border-deep/15">
              {sourcing.map((s) => (
                <li key={s.name} className="flex justify-between gap-6 py-4">
                  <div><p className="font-medium">{s.name}</p><p className="text-[15px] text-mute">{s.note}</p></div>
                  <p className="text-end text-mute">{s.origin}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title={t.about.sustainabilityTitle} />
            <ul className="mt-8 space-y-4 text-lg leading-relaxed text-mute">
              {sustainability.map((s) => <li key={s} className="border-s-2 border-zellige ps-4">{s}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading title={t.about.atmosphereTitle} />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <Photo src="/images/interior.svg" alt="The main dining room in the evening" className="aspect-[4/3] rounded-[3px]" sizes="(min-width:768px) 33vw, 100vw" />
            <Photo src="/images/terrace.svg" alt="The terrace at dusk, lanterns lit" className="aspect-[4/3] rounded-[3px]" sizes="(min-width:768px) 33vw, 100vw" />
            <Photo src="/images/bar.svg" alt="The bar with a row of glasses" className="aspect-[4/3] rounded-[3px]" sizes="(min-width:768px) 33vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="dark-surface bg-deep py-20 text-chalk sm:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-light sm:text-5xl">{t.about.awardsTitle}</h2>
            <ul className="mt-8 divide-y divide-chalk/15 border-y border-chalk/15">
              {awards.map((a) => (
                <li key={a.title} className="flex items-baseline justify-between gap-6 py-5">
                  <div><p className="font-display text-2xl">{a.title}</p><p className="text-chalk/65">{a.issuer}</p></div>
                  <p className="text-saffron">{a.year}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-4xl font-light sm:text-5xl">{t.about.timelineTitle}</h2>
            <ol className="mt-8 space-y-6 border-s border-chalk/25 ps-6">
              {timeline.map((e) => (
                <li key={e.year} className="relative">
                  <span aria-hidden className="absolute -start-[1.9rem] top-2 h-2.5 w-2.5 rounded-full bg-saffron" />
                  <p className="text-saffron">{e.year}</p>
                  <p className="font-display text-2xl">{e.title}</p>
                  <p className="mt-1 text-chalk/70">{e.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-20 text-center sm:py-24">
        <div className="container-x">
          <ButtonLink href={localizedPath(locale, '/reservations')}>{t.common.reserveTable}</ButtonLink>
        </div>
      </section>
    </>
  )
}
