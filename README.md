# Lommefasit

Simple Norwegian calculators for everyday money questions. Live at [lommefasit.no](https://www.lommefasit.no).

| Calculator            | Norwegian route          | English route           |
| --------------------- | ------------------------ | ----------------------- |
| Home page             | `/`                      | `/en`                   |
| Holiday pay           | `/feriepenger`           | `/en/holiday-pay`       |
| Percent               | `/prosent`               | `/en/percentage`        |
| Electricity price now | `/strompris`             | `/en/electricity-price` |
| Overtime pay          | `/overtid`               | `/en/overtime`          |
| Mileage allowance     | `/kilometergodtgjorelse` | `/en/mileage-allowance` |

The site is in Norwegian (bokmål) with an English version under `/en`. Code comments and test names are in Norwegian.

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
    (nb)/                    Norwegian root layout, home page and pages
      <slug>/page.tsx        Page with metadata, intro, guide text and FAQ
    (en)/                    English root layout
      en/<slug>/page.tsx     English version of each page
      en/opengraph-image/    English share image (route handler)
    global-not-found.tsx     404 page for both languages
    icon.tsx, apple-icon.tsx, opengraph-image.tsx
                             Generated favicon, touch icon and share image
    robots.ts, sitemap.ts, manifest.ts
  components/
    calculators/             Client components with the form and result,
                             shared by both languages through a lang prop
    ElectricityPrices.tsx    Zone picker, key figures, chart and table
    RootDocument.tsx         <html>, fonts, header and footer for both layouts
    LanguageToggle.tsx       Link to the same page in the other language
    Faq.tsx                  FAQ section with FAQPage JSON-LD
    JsonLd.tsx               JSON-LD script tag and WebApplication schema
                             Plus site header, footer, nav and calculator cards
  lib/
    i18n.ts                  Languages, locales and home paths
    site.ts                  Site URL, name and pageMetadata() helper
    calculators.ts           Calculators with slug and text per language
                             (home page, nav, sitemap, language toggle)
    calculatorColors.ts      Tailwind classes for each card color
    <calculation>.ts         Pure calculation logic, with a matching .test.ts
    format.ts                Number parsing and formatting per language
```

Calculation logic lives in `src/lib` as pure functions with tests. The components only parse input, call these functions and show the result.

## Languages

Each language has its own root layout in a route group, so `<html lang>` is correct and switching language is a full page load. Norwegian URLs have no prefix, and English pages live under `/en` with English slugs.

- Page text (intro, guide, FAQ) is written separately in each language's `page.tsx`. Calculator components keep their labels in a `copy` object per language.
- `translations(path)` in `src/lib/calculators.ts` maps a page to its counterpart. The language toggle, `hreflang` links and sitemap all use it, so a new page only needs its slugs added there.
- Use `parseNumber` and the format helpers with `lang`. English input treats commas as thousands separators (`550,000`), Norwegian treats them as decimals.

## Adding a calculator

1. Write the logic and tests in `src/lib/<name>.ts` and `src/lib/<name>.test.ts`.
2. Create a client component in `src/components/calculators/` with a `copy` object for each language. Use an existing calculator as a template.
3. Create `src/app/(nb)/<slug>/page.tsx` and `src/app/(en)/en/<english-slug>/page.tsx`.
4. Add an entry to `src/lib/calculators.ts` with `nb` and `en` text and slugs. Set `status` to `"soon"` to hide it from the home page, nav, footer and sitemap until it is ready.
5. Pick a `color` that matches the classes used in the calculator component. A new color must also be added to `src/lib/calculatorColors.ts`.
6. Export metadata with `pageMetadata({ title, description, path })` (add `lang: "en"` on English pages) from `src/lib/site.ts` and render `<CalculatorJsonLd>` in the page. Use the helper rather than setting `openGraph` by hand: Next replaces `openGraph` and `twitter` wholesale per segment, so the helper sets the canonical URL, `hreflang` links, share image and social tags together.
7. Add guide text and a `<Faq>` below the calculator. Search engines rank pages with explanatory text much better than a bare form. Check facts against the source (Lovdata, Skatteetaten, regjeringen.no) before publishing.

## SEO

- Every page has a canonical URL. `/strompris` uses `/strompris` without query parameters, so the zone variants don't compete in search. The same goes for `/en/electricity-price`.
- Every page links to its other language with `hreflang`, with Norwegian as `x-default`.
- The sitemap and robots file are generated from `src/lib/calculators.ts`, and the sitemap lists both languages.
- The site is verified in Google Search Console as a domain property, through a TXT record at Domeneshop. Don't remove that record.
- Security headers are set for all routes in `next.config.ts`.

## Rates that need yearly updates

Several calculators use official rates that change every year. Check these at the start of each year, or whenever new rates are announced:

| File                                                                                        | Value                                                      | Source                                         |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------- |
| `src/lib/holidayPay.ts`                                                                     | Basic amount (G), changes on 1 May                         | NAV                                            |
| `src/lib/mileage.ts`                                                                        | State mileage rate, tax-free rate and passenger supplement | Særavtalen for reiser innenlands, Skatteetaten |
| `src/lib/electricityPrice.ts`                                                               | Electricity support threshold and rate                     | Forskrift om strømstønad                       |
| `src/components/ElectricityPrices.tsx`                                                      | Support threshold and Norgespris, both languages           | regjeringen.no                                 |
| `src/app/(nb)/strompris/page.tsx`, `src/app/(en)/en/electricity-price/page.tsx`             | Support threshold and Norgespris in the FAQ text           | regjeringen.no                                 |
| `src/app/(nb)/kilometergodtgjorelse/page.tsx`, `src/app/(en)/en/mileage-allowance/page.tsx` | State mileage rate in the meta description                 | Særavtalen for reiser innenlands               |

Page text repeats some of these numbers in both languages, so update the text together with the constants. Norgespris is only decided through 2026.

Electricity prices are fetched from [hvakosterstrommen.no](https://www.hvakosterstrommen.no).
