// State data — approximate values sourced from Tax Foundation (2024) and MERIC (Q4 2023) cost of living index.
// Numbers are baked in for offline use. Re-fresh once a year by hand.
//
//  incomeTax       top marginal rate on wage income, percent
//  salesTax        combined state + local average rate, percent
//  propertyTax     effective rate on owner occupied housing, percent of home value per year
//  col             cost of living index, US average = 100
//
// New Hampshire and Tennessee tax interest / dividends only and have no wage income tax.

export type StateRow = {
  code: string;
  name: string;
  incomeTax: number;
  salesTax: number;
  propertyTax: number;
  col: number;
};

export const STATES: StateRow[] = [
  { code: "AL", name: "Alabama",        incomeTax: 5.00, salesTax: 9.29, propertyTax: 0.41, col: 88.5 },
  { code: "AK", name: "Alaska",         incomeTax: 0.00, salesTax: 1.82, propertyTax: 1.04, col: 125.0 },
  { code: "AZ", name: "Arizona",        incomeTax: 2.50, salesTax: 8.38, propertyTax: 0.62, col: 102.6 },
  { code: "AR", name: "Arkansas",       incomeTax: 4.40, salesTax: 9.45, propertyTax: 0.64, col: 90.3 },
  { code: "CA", name: "California",     incomeTax: 13.30, salesTax: 8.85, propertyTax: 0.75, col: 142.2 },
  { code: "CO", name: "Colorado",       incomeTax: 4.40, salesTax: 7.81, propertyTax: 0.55, col: 105.5 },
  { code: "CT", name: "Connecticut",    incomeTax: 6.99, salesTax: 6.35, propertyTax: 2.00, col: 113.1 },
  { code: "DE", name: "Delaware",       incomeTax: 6.60, salesTax: 0.00, propertyTax: 0.61, col: 101.1 },
  { code: "DC", name: "District of Columbia", incomeTax: 10.75, salesTax: 6.00, propertyTax: 0.62, col: 144.0 },
  { code: "FL", name: "Florida",        incomeTax: 0.00, salesTax: 7.02, propertyTax: 0.91, col: 100.7 },
  { code: "GA", name: "Georgia",        incomeTax: 5.39, salesTax: 7.38, propertyTax: 0.92, col: 90.8 },
  { code: "HI", name: "Hawaii",         incomeTax: 11.00, salesTax: 4.50, propertyTax: 0.32, col: 184.0 },
  { code: "ID", name: "Idaho",          incomeTax: 5.80, salesTax: 6.02, propertyTax: 0.67, col: 98.6 },
  { code: "IL", name: "Illinois",       incomeTax: 4.95, salesTax: 8.86, propertyTax: 2.27, col: 92.1 },
  { code: "IN", name: "Indiana",        incomeTax: 3.05, salesTax: 7.00, propertyTax: 0.84, col: 90.6 },
  { code: "IA", name: "Iowa",           incomeTax: 5.70, salesTax: 6.94, propertyTax: 1.57, col: 89.7 },
  { code: "KS", name: "Kansas",         incomeTax: 5.70, salesTax: 8.66, propertyTax: 1.41, col: 87.5 },
  { code: "KY", name: "Kentucky",       incomeTax: 4.00, salesTax: 6.00, propertyTax: 0.86, col: 92.7 },
  { code: "LA", name: "Louisiana",      incomeTax: 4.25, salesTax: 9.55, propertyTax: 0.55, col: 90.6 },
  { code: "ME", name: "Maine",          incomeTax: 7.15, salesTax: 5.50, propertyTax: 1.36, col: 110.4 },
  { code: "MD", name: "Maryland",       incomeTax: 5.75, salesTax: 6.00, propertyTax: 1.05, col: 116.5 },
  { code: "MA", name: "Massachusetts",  incomeTax: 9.00, salesTax: 6.25, propertyTax: 1.20, col: 148.4 },
  { code: "MI", name: "Michigan",       incomeTax: 4.25, salesTax: 6.00, propertyTax: 1.38, col: 90.6 },
  { code: "MN", name: "Minnesota",      incomeTax: 9.85, salesTax: 7.49, propertyTax: 1.11, col: 94.1 },
  { code: "MS", name: "Mississippi",    incomeTax: 4.70, salesTax: 7.07, propertyTax: 0.81, col: 86.3 },
  { code: "MO", name: "Missouri",       incomeTax: 4.70, salesTax: 8.39, propertyTax: 0.97, col: 88.5 },
  { code: "MT", name: "Montana",        incomeTax: 5.90, salesTax: 0.00, propertyTax: 0.83, col: 104.1 },
  { code: "NE", name: "Nebraska",       incomeTax: 5.84, salesTax: 6.97, propertyTax: 1.63, col: 91.5 },
  { code: "NV", name: "Nevada",         incomeTax: 0.00, salesTax: 8.23, propertyTax: 0.56, col: 100.7 },
  { code: "NH", name: "New Hampshire",  incomeTax: 0.00, salesTax: 0.00, propertyTax: 1.93, col: 113.8 },
  { code: "NJ", name: "New Jersey",     incomeTax: 10.75, salesTax: 6.60, propertyTax: 2.49, col: 112.5 },
  { code: "NM", name: "New Mexico",     incomeTax: 5.90, salesTax: 7.62, propertyTax: 0.80, col: 94.0 },
  { code: "NY", name: "New York",       incomeTax: 10.90, salesTax: 8.53, propertyTax: 1.72, col: 124.4 },
  { code: "NC", name: "North Carolina", incomeTax: 4.50, salesTax: 6.99, propertyTax: 0.82, col: 96.5 },
  { code: "ND", name: "North Dakota",   incomeTax: 2.50, salesTax: 7.04, propertyTax: 0.98, col: 95.8 },
  { code: "OH", name: "Ohio",           incomeTax: 3.50, salesTax: 7.24, propertyTax: 1.56, col: 92.1 },
  { code: "OK", name: "Oklahoma",       incomeTax: 4.75, salesTax: 8.99, propertyTax: 0.90, col: 87.0 },
  { code: "OR", name: "Oregon",         incomeTax: 9.90, salesTax: 0.00, propertyTax: 0.93, col: 113.1 },
  { code: "PA", name: "Pennsylvania",   incomeTax: 3.07, salesTax: 6.34, propertyTax: 1.49, col: 94.6 },
  { code: "RI", name: "Rhode Island",   incomeTax: 5.99, salesTax: 7.00, propertyTax: 1.40, col: 110.5 },
  { code: "SC", name: "South Carolina", incomeTax: 6.40, salesTax: 7.50, propertyTax: 0.57, col: 96.7 },
  { code: "SD", name: "South Dakota",   incomeTax: 0.00, salesTax: 6.40, propertyTax: 1.17, col: 93.2 },
  { code: "TN", name: "Tennessee",      incomeTax: 0.00, salesTax: 9.55, propertyTax: 0.67, col: 90.3 },
  { code: "TX", name: "Texas",          incomeTax: 0.00, salesTax: 8.20, propertyTax: 1.68, col: 92.7 },
  { code: "UT", name: "Utah",           incomeTax: 4.65, salesTax: 7.19, propertyTax: 0.57, col: 103.2 },
  { code: "VT", name: "Vermont",        incomeTax: 8.75, salesTax: 6.36, propertyTax: 1.83, col: 116.1 },
  { code: "VA", name: "Virginia",       incomeTax: 5.75, salesTax: 5.77, propertyTax: 0.82, col: 100.7 },
  { code: "WA", name: "Washington",     incomeTax: 0.00, salesTax: 9.38, propertyTax: 0.87, col: 116.0 },
  { code: "WV", name: "West Virginia",  incomeTax: 5.12, salesTax: 6.55, propertyTax: 0.57, col: 84.1 },
  { code: "WI", name: "Wisconsin",      incomeTax: 7.65, salesTax: 5.43, propertyTax: 1.61, col: 95.1 },
  { code: "WY", name: "Wyoming",        incomeTax: 0.00, salesTax: 5.44, propertyTax: 0.55, col: 95.6 },
];

// Computed burden score combining income, sales, property tax + cost of living premium.
// Tuned so a cross-section of states maps to roughly even thirds.
export function burdenScore(s: StateRow): number {
  return s.incomeTax + s.salesTax * 0.4 + s.propertyTax * 8 + (s.col - 100) * 0.05;
}

export type Tier = "Low" | "Mid" | "High";

export function burdenTier(s: StateRow): Tier {
  const score = burdenScore(s);
  if (score < 12) return "Low";
  if (score < 20) return "Mid";
  return "High";
}

// Federal income tax, 2024 single filer brackets, standard deduction $14,600.
export function federalTax(gross: number): number {
  const taxable = Math.max(0, gross - 14600);
  const brackets: Array<[number, number]> = [
    [11600, 0.10],
    [47150, 0.12],
    [100525, 0.22],
    [191950, 0.24],
    [243725, 0.32],
    [609350, 0.35],
    [Number.POSITIVE_INFINITY, 0.37],
  ];
  let tax = 0;
  let prev = 0;
  for (const [cap, rate] of brackets) {
    if (taxable <= prev) break;
    const inBracket = Math.min(taxable, cap) - prev;
    if (inBracket > 0) tax += inBracket * rate;
    prev = cap;
  }
  return tax;
}

// State income tax, approximated as 60 percent of top marginal rate on income above a $5,000 standard deduction.
// This is intentionally rough. Top marginal rates overstate the actual effective rate by a wide margin in most states.
export function stateIncomeTax(gross: number, topMarginalPct: number): number {
  const taxable = Math.max(0, gross - 5000);
  return taxable * (topMarginalPct / 100) * 0.6;
}

export function ficaTax(gross: number): number {
  return gross * 0.0765;
}
