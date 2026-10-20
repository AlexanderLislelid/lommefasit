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
    <slug>/page.tsx          Page with metadata and intro text
    <slug>/*Calculator.tsx   Client component with the form and result
  components/                Site header, footer, nav and calculator cards
  lib/
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

## Rates that need yearly updates

Several calculators use official rates that change every year. Check these at the start of each year, or whenever new rates are announced:

| File                          | Value                                                      | Source                                         |
| ----------------------------- | ---------------------------------------------------------- | ---------------------------------------------- |
| `src/lib/holidayPay.ts`       | Basic amount (G), changes on 1 May                         | NAV                                            |
| `src/lib/mileage.ts`          | State mileage rate, tax-free rate and passenger supplement | Særavtalen for reiser innenlands, Skatteetaten |
| `src/lib/electricityPrice.ts` | Electricity support threshold and rate                     | Forskrift om strømstønad                       |

Electricity prices are fetched from [hvakosterstrommen.no](https://www.hvakosterstrommen.no).
