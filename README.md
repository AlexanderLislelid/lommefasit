# Lommefasit

Simple Norwegian calculators for everyday money questions. Live at [lommefasit.no](https://www.lommefasit.no).

| Calculator                           | Route                    |
| ------------------------------------ | ------------------------ |
| Holiday pay (feriepenger)            | `/feriepenger`           |
| Percent (prosent)                    | `/prosent`               |
| Electricity price now (strømpris)    | `/strompris`             |
| Overtime pay (overtid)               | `/overtid`               |
| Mileage allowance (kilometergodtgj.) | `/kilometergodtgjorelse` |

The site itself is in Norwegian (bokmål), and so are code comments and test names.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) and React 19
- Tailwind CSS 4
- Vitest for unit tests
- Deployed on Vercel, with Vercel Analytics and Speed Insights

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Script                 | What it does                   |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Start the dev server           |
| `npm run build`        | Production build               |
| `npm test`             | Run unit tests once            |
| `npm run test:watch`   | Run unit tests in watch mode   |
| `npm run lint`         | Lint with ESLint               |
| `npm run format`       | Format with Prettier           |
| `npm run format:check` | Check formatting with Prettier |

## Project structure

```
src/
  app/
    <slug>/page.tsx          Page with metadata, intro, guide text and FAQ
    <slug>/*Calculator.tsx   Client component with the form and result
    icon.tsx, apple-icon.tsx, opengraph-image.tsx
                             Generated favicon, touch icon and share image
    robots.ts, sitemap.ts, manifest.ts
  components/
    Faq.tsx                  FAQ section with FAQPage JSON-LD
    JsonLd.tsx               JSON-LD script tag and WebApplication schema
                             Plus site header, footer, nav and calculator cards
  lib/
    site.ts                  Site URL, name and pageMetadata() helper
    calculators.ts           List of calculators (home page, nav, sitemap)
    calculatorColors.ts      Tailwind classes for each card color
    <calculation>.ts         Pure calculation logic, with a matching .test.ts
    format.ts                Number and currency formatting (nb-NO)
```

Calculation logic lives in `src/lib` as pure functions with tests. The components only parse input, call these functions and show the result.

## Adding a calculator

1. Write the logic and tests in `src/lib/<name>.ts` and `src/lib/<name>.test.ts`.
2. Create `src/app/<slug>/page.tsx` and a client component for the calculator. Use an existing calculator as a template.
3. Add an entry to `src/lib/calculators.ts`. Set `status` to `"soon"` to hide it from the home page, nav, footer and sitemap until it is ready.
4. Pick a `color` that matches the classes used in the calculator component. A new color must also be added to `src/lib/calculatorColors.ts`.
5. Export metadata with `pageMetadata({ title, description, path })` from `src/lib/site.ts` and render `<CalculatorJsonLd>` in the page. Use the helper rather than setting `openGraph` by hand: Next replaces `openGraph` and `twitter` wholesale per segment, so the helper sets the canonical URL, share image and social tags together.
6. Add guide text and a `<Faq>` below the calculator. Search engines rank pages with explanatory text much better than a bare form. Check facts against the source (Lovdata, Skatteetaten, regjeringen.no) before publishing.

## SEO

- Every page has a canonical URL. `/strompris` uses `/strompris` without query parameters, so the zone variants don't compete in search.
- The sitemap and robots file are generated from `src/lib/calculators.ts`.
- The site is verified in Google Search Console as a domain property, through a TXT record at Domeneshop. Don't remove that record.
- Security headers are set for all routes in `next.config.ts`.

## Rates that need yearly updates

Several calculators use official rates that change every year. Check these at the start of each year, or whenever new rates are announced:

| File                                     | Value                                                      | Source                                         |
| ---------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------- |
| `src/lib/holidayPay.ts`                  | Basic amount (G), changes on 1 May                         | NAV                                            |
| `src/lib/mileage.ts`                     | State mileage rate, tax-free rate and passenger supplement | Særavtalen for reiser innenlands, Skatteetaten |
| `src/lib/electricityPrice.ts`            | Electricity support threshold and rate                     | Forskrift om strømstønad                       |
| `src/app/strompris/page.tsx`             | Support threshold and Norgespris in the intro and FAQ text | regjeringen.no                                 |
| `src/app/kilometergodtgjorelse/page.tsx` | State mileage rate in the meta description                 | Særavtalen for reiser innenlands               |

Page text repeats some of these numbers, so update the text together with the constants. Norgespris is only decided through 2026.

Electricity prices are fetched from [hvakosterstrommen.no](https://www.hvakosterstrommen.no).
