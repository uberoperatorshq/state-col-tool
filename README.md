# state-col-tool

US state cost of living + disposable income reference tool. Single page Next.js 14 app, all client side, no backend.

## Sections

1. **State cribsheet** — 50 states + DC with top marginal income tax, combined sales tax, effective property tax, COL index (US avg = 100), and a Low / Mid / High burden tier. Searchable + sortable.
2. **Income calculator** — gross to net using 2024 federal brackets (single filer, $14,600 std deduction), FICA 7.65%, and an approximated state effective rate (60% of top marginal). Outputs net annual, net monthly, and a COL-adjusted monthly.
3. **Real disposable income** — subtract typical monthly expenses (housing, debt, food, utilities, insurance, etc.) from net monthly. Color codes the result green / amber / red.

## Local dev

```bash
npm install
npm run dev
```

## Data

State data is baked into `lib/states.ts`. Refresh the constants once a year:

- Income / sales / property tax rates: Tax Foundation
- COL index: MERIC quarterly index

## Notes

Math is approximate and meant for quick comparison, not advice. Does not account for itemized deductions, dependents, HSA / 401k, AMT, capital gains, NIIT, or local payroll taxes.
