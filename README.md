# Maison Ember: restaurant website prototype

A mock-data-only website for a fictional restaurant in Agdal, Rabat. Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3, Framer Motion, Lucide.

```bash
npm install
npm run dev        # http://localhost:3000 (redirects to /en)
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint
```

`next/font/google` downloads fonts at build time, so the first `npm run build` needs network access.

## Verification status

This source was written in a sandbox with **no network access**, so `npm install`, `npm run build`, `next lint` and a browser run were **not executed**. What was checked: every file parses with the TypeScript compiler (no syntax errors), all `/images/...` paths used in code exist in `public/`, and all generated SVGs are well-formed XML. Treat the first `npm install && npm run build` as the real test and expect to fix a few type or lint nits. ESLint's `no-unused-vars` and `no-unescaped-entities` are set to `warn` in `.eslintrc.json` so a nit cannot block a build.

## Routes (each exists under /en, /fr and /ar)

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, signature dishes, story, experience, menu highlights, quick reservation, reviews, events, gallery, location |
| `/menu`, `/menu/[slug]` | Searchable, filterable, sortable menu; dish dialog; full dish page (33 dishes) |
| `/reservations` | 5-step reservation flow (date, guests, time, seating, details). Accepts `?date=&guests=&time=&offer=&modify=1` |
| `/reservation` | My reservation: view, change, cancel |
| `/reservation/confirmation` | Confirmation with calendar (.ics) download |
| `/events`, `/events/[slug]` | Events and mock seat holds (one event is sold out) |
| `/offers` | Five promotions |
| `/about` | Story, philosophy, chef, team, sourcing, sustainability, awards, timeline |
| `/gallery` | Masonry gallery with keyboard-navigable lightbox |
| `/reviews` | Rating summary, distribution filter, sorting |
| `/contact`, `/faq` | Contact form with validation, directions, accordion FAQ |
| `/favorites` | Saved dishes (localStorage) |
| any other URL | Localized 404 |

Also: `sitemap.xml`, `robots.txt`, Restaurant JSON-LD on every page, per-page title, description, canonical, hreflang alternates and Open Graph tags.

## Architecture

```
src/data/        All mock content (restaurant, menu, reviews, events, offers, team, gallery, faq, reservation rules)
src/types/       Shared TypeScript types
src/lib/api/     MOCK SERVICES: the only place a backend plugs in (reservations.ts, contact.ts)
src/lib/         availability rules, hours/open status, validation, SEO, i18n, storage hook
src/components/  ui/ (primitives), layout/, home/, menu/, reservation/, events/, gallery/, reviews/, forms/, providers/
src/app/[locale] Routes. Server components by default; client components only where state is needed
scripts/         generate-placeholders.py regenerates the illustrated images
```

## Future backend integration

| Concern | Today | Replace |
| --- | --- | --- |
| Availability | `lib/availability.ts` (deterministic hash) via `fetchAvailability` | `fetch('/api/availability?...')` or a booking provider (e.g. SevenRooms, TheFork, your own API) |
| Create, change, cancel reservation | `lib/api/reservations.ts` returns objects after a delay | POST/PATCH/DELETE to your API; send confirmation email/SMS server-side |
| Reservation persistence | localStorage in `AppProvider` (`STORAGE_KEYS`) | Fetch the reservation by id or authenticated user |
| Contact form | `lib/api/contact.ts` | POST to an email/CRM endpoint (add rate limiting and spam protection) |
| Event seats | localStorage in `EventSeats` | Ticketing API with real inventory and payment |
| Menu, events, reviews, offers | `src/data/*.ts` | A CMS or database. Pages already read from typed arrays, so swap the imports for fetch functions |
| Payments | none | Add a payment provider in the event seat flow |

## Demo behaviours

- Booking or messaging with the email `fail@demo.test` triggers the "failed submission" state.
- 24 Oct 2026 is fully booked; Mondays are closed; some time slots and seating options are unavailable. Availability is deterministic per date.
- The "Truffle Evening" event is sold out; "Langoustines" is marked unavailable.

## Internationalization

`/en`, `/fr`, `/ar` are routed and `/ar` renders `dir="rtl"` with logical (start/end) spacing and mirrored arrows. Dictionaries live in `src/lib/i18n/dictionaries.ts`. French and Arabic translate navigation, hero, booking flow, confirmation, forms, errors, menu UI, allergens and footer. Everything else (long marketing copy in `src/data`, About, Events, FAQ text) falls back to English until translated. To add a language, add its code to `locales` and a partial dictionary.

## Images

There is no photography in this prototype. `public/images` holds generated SVG illustrations that stand in for photos (`npm run placeholders` regenerates them). Replace files at the same paths, or edit the `image` fields in `src/data`. For real photos, `next/image` will optimise them automatically. Also add a 1200x630 Open Graph image.

## Known limits

- Currency is MAD; all names, phone numbers, awards and reviews are fictional. The `.example` email domain is reserved and non-routable.
- Opening hours use the `Africa/Casablanca` timezone and do not model Ramadan hours.
- The "map" is an illustration. Use an embed once a provider is chosen.
