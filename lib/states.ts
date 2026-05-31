// State data refreshed 2026-05-31 from authoritative sources.
//
// Sources + data periods:
//  incomeTax    top marginal individual income tax rate on wages, percent.
//               Tax Foundation, "State Individual Income Tax Rates" (effective January 1, 2025).
//               https://taxfoundation.org/data/all/state/state-income-tax-rates
//               Notes: New Hampshire repealed its interest / dividends tax on Jan 1, 2025, so
//               NH is now 0% on all individual income. Tennessee is 0% on wages
//               (its Hall tax was repealed earlier). Washington has a 7% capital gains tax
//               only, no wage income tax, so wages are treated as 0% for this tool.
//
//  salesTax     combined state + average local sales tax rate, percent.
//               Tax Foundation, "State and Local Sales Tax Rates, Midyear 2025" (as of July 1, 2025).
//               https://taxfoundation.org/data/all/state/sales-tax-rates-midyear-2025/
//
//  propertyTax  effective property tax rate on owner occupied housing, percent of home value, annual.
//               Tax Foundation, "Property Taxes by State" (2024 data, from ACS 5-year estimates).
//               https://taxfoundation.org/data/all/state/property-taxes-by-state
//
//  col          cost of living index, US average = 100.
//               MERIC Cost of Living Data Series, 2025 Annual Average.
//               https://meric.mo.gov/data/cost-living-data-series
//
// Refresh annually. Each source typically publishes new figures Q1 to Q2.

export type StateRow = {
  code: string;
  name: string;
  incomeTax: number;
  salesTax: number;
  propertyTax: number;
  col: number;
};

export const STATES: StateRow[] = [
  { code: "AL", name: "Alabama",        incomeTax: 5.00,  salesTax: 9.44,  propertyTax: 0.28, col: 88.1  },
  { code: "AK", name: "Alaska",         incomeTax: 0.00,  salesTax: 1.82,  propertyTax: 0.70, col: 126.7 },
  { code: "AZ", name: "Arizona",        incomeTax: 2.50,  salesTax: 8.52,  propertyTax: 0.50, col: 110.3 },
  { code: "AR", name: "Arkansas",       incomeTax: 3.90,  salesTax: 9.48,  propertyTax: 0.52, col: 90.1  },
  { code: "CA", name: "California",     incomeTax: 13.30, salesTax: 8.98,  propertyTax: 0.71, col: 143.1 },
  { code: "CO", name: "Colorado",       incomeTax: 4.40,  salesTax: 7.86,  propertyTax: 0.43, col: 103.1 },
  { code: "CT", name: "Connecticut",    incomeTax: 6.99,  salesTax: 6.35,  propertyTax: 1.60, col: 114.0 },
  { code: "DE", name: "Delaware",       incomeTax: 6.60,  salesTax: 0.00,  propertyTax: 0.49, col: 103.1 },
  { code: "DC", name: "District of Columbia", incomeTax: 10.75, salesTax: 6.00, propertyTax: 0.60, col: 137.8 },
  { code: "FL", name: "Florida",        incomeTax: 0.00,  salesTax: 7.02,  propertyTax: 0.73, col: 101.4 },
  { code: "GA", name: "Georgia",        incomeTax: 5.39,  salesTax: 7.44,  propertyTax: 0.79, col: 92.2  },
  { code: "HI", name: "Hawaii",         incomeTax: 11.00, salesTax: 4.50,  propertyTax: 0.28, col: 183.9 },
  { code: "ID", name: "Idaho",          incomeTax: 5.695, salesTax: 6.03,  propertyTax: 0.47, col: 99.3  },
  { code: "IL", name: "Illinois",       incomeTax: 4.95,  salesTax: 8.92,  propertyTax: 1.75, col: 95.0  },
  { code: "IN", name: "Indiana",        incomeTax: 3.00,  salesTax: 7.00,  propertyTax: 0.70, col: 90.7  },
  { code: "IA", name: "Iowa",           incomeTax: 3.80,  salesTax: 6.94,  propertyTax: 1.25, col: 89.8  },
  { code: "KS", name: "Kansas",         incomeTax: 5.58,  salesTax: 8.78,  propertyTax: 1.36, col: 88.4  },
  { code: "KY", name: "Kentucky",       incomeTax: 4.00,  salesTax: 6.00,  propertyTax: 0.68, col: 91.5  },
  { code: "LA", name: "Louisiana",      incomeTax: 3.00,  salesTax: 10.11, propertyTax: 0.39, col: 92.9  },
  { code: "ME", name: "Maine",          incomeTax: 7.15,  salesTax: 5.50,  propertyTax: 0.99, col: 114.0 },
  { code: "MD", name: "Maryland",       incomeTax: 5.75,  salesTax: 6.00,  propertyTax: 0.87, col: 117.4 },
  { code: "MA", name: "Massachusetts",  incomeTax: 9.00,  salesTax: 6.25,  propertyTax: 1.06, col: 148.5 },
  { code: "MI", name: "Michigan",       incomeTax: 4.25,  salesTax: 6.00,  propertyTax: 1.07, col: 91.9  },
  { code: "MN", name: "Minnesota",      incomeTax: 9.85,  salesTax: 8.13,  propertyTax: 0.95, col: 93.6  },
  { code: "MS", name: "Mississippi",    incomeTax: 4.40,  salesTax: 7.06,  propertyTax: 0.55, col: 86.0  },
  { code: "MO", name: "Missouri",       incomeTax: 4.70,  salesTax: 8.41,  propertyTax: 0.67, col: 88.9  },
  { code: "MT", name: "Montana",        incomeTax: 5.90,  salesTax: 0.00,  propertyTax: 0.60, col: 96.8  },
  { code: "NE", name: "Nebraska",       incomeTax: 5.20,  salesTax: 6.98,  propertyTax: 1.21, col: 91.8  },
  { code: "NV", name: "Nevada",         incomeTax: 0.00,  salesTax: 8.24,  propertyTax: 0.60, col: 99.7  },
  { code: "NH", name: "New Hampshire",  incomeTax: 0.00,  salesTax: 0.00,  propertyTax: 2.18, col: 110.5 },
  { code: "NJ", name: "New Jersey",     incomeTax: 10.75, salesTax: 6.60,  propertyTax: 2.49, col: 115.3 },
  { code: "NM", name: "New Mexico",     incomeTax: 5.90,  salesTax: 7.67,  propertyTax: 0.80, col: 93.7  },
  { code: "NY", name: "New York",       incomeTax: 10.90, salesTax: 8.54,  propertyTax: 1.72, col: 125.8 },
  { code: "NC", name: "North Carolina", incomeTax: 4.25,  salesTax: 7.00,  propertyTax: 0.84, col: 97.9  },
  { code: "ND", name: "North Dakota",   incomeTax: 2.50,  salesTax: 7.08,  propertyTax: 0.98, col: 91.1  },
  { code: "OH", name: "Ohio",           incomeTax: 3.50,  salesTax: 7.30,  propertyTax: 1.56, col: 94.6  },
  { code: "OK", name: "Oklahoma",       incomeTax: 4.75,  salesTax: 9.05,  propertyTax: 0.90, col: 84.7  },
  { code: "OR", name: "Oregon",         incomeTax: 9.90,  salesTax: 0.00,  propertyTax: 0.97, col: 112.8 },
  { code: "PA", name: "Pennsylvania",   incomeTax: 3.07,  salesTax: 6.34,  propertyTax: 1.58, col: 97.1  },
  { code: "RI", name: "Rhode Island",   incomeTax: 5.99,  salesTax: 7.00,  propertyTax: 1.63, col: 110.7 },
  { code: "SC", name: "South Carolina", incomeTax: 6.20,  salesTax: 7.49,  propertyTax: 0.57, col: 92.7  },
  { code: "SD", name: "South Dakota",   incomeTax: 0.00,  salesTax: 6.11,  propertyTax: 1.31, col: 91.8  },
  { code: "TN", name: "Tennessee",      incomeTax: 0.00,  salesTax: 9.61,  propertyTax: 0.71, col: 90.1  },
  { code: "TX", name: "Texas",          incomeTax: 0.00,  salesTax: 8.20,  propertyTax: 1.80, col: 91.1  },
  { code: "UT", name: "Utah",           incomeTax: 4.55,  salesTax: 7.42,  propertyTax: 0.60, col: 99.5  },
  { code: "VT", name: "Vermont",        incomeTax: 8.75,  salesTax: 6.39,  propertyTax: 1.90, col: 113.5 },
  { code: "VA", name: "Virginia",       incomeTax: 5.75,  salesTax: 5.77,  propertyTax: 0.82, col: 102.2 },
  { code: "WA", name: "Washington",     incomeTax: 0.00,  salesTax: 9.47,  propertyTax: 0.84, col: 112.9 },
  { code: "WV", name: "West Virginia",  incomeTax: 4.82,  salesTax: 6.58,  propertyTax: 0.58, col: 88.0  },
  { code: "WI", name: "Wisconsin",      incomeTax: 7.65,  salesTax: 5.72,  propertyTax: 1.85, col: 98.5  },
  { code: "WY", name: "Wyoming",        incomeTax: 0.00,  salesTax: 5.56,  propertyTax: 0.61, col: 94.6  },
];

// Computed burden score combining income, sales, property tax + cost of living premium.
// Tuned so a cross section of states maps to roughly even thirds.
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

// ============================================================================
// Federal tax, 2025
//
// Brackets and standard deductions per IRS Rev. Proc. 2024-40 (released Oct 22, 2024),
// effective for tax year 2025.
// https://www.irs.gov/pub/irs-drop/rp-24-40.pdf
//
// Standard deductions:
//   Single:                 $15,000
//   Married filing jointly: $30,000
// ============================================================================

export type FilingStatus = "single" | "mfj";

export const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 15000,
  mfj: 30000,
};

type Bracket = [cap: number, rate: number];

const BRACKETS_2025: Record<FilingStatus, Bracket[]> = {
  single: [
    [11925, 0.10],
    [48475, 0.12],
    [103350, 0.22],
    [197300, 0.24],
    [250525, 0.32],
    [626350, 0.35],
    [Number.POSITIVE_INFINITY, 0.37],
  ],
  mfj: [
    [23850, 0.10],
    [96950, 0.12],
    [206700, 0.22],
    [394600, 0.24],
    [501050, 0.32],
    [751600, 0.35],
    [Number.POSITIVE_INFINITY, 0.37],
  ],
};

export function federalTax(gross: number, filing: FilingStatus = "single"): number {
  const taxable = Math.max(0, gross - STANDARD_DEDUCTION[filing]);
  const brackets = BRACKETS_2025[filing];
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
// In most states the top marginal threshold roughly doubles for MFJ, so the effective rate at the same income
// stays close to single, which is why the approximation is filing status agnostic. Crude but in the ballpark.
export function stateIncomeTax(gross: number, topMarginalPct: number): number {
  const taxable = Math.max(0, gross - 5000);
  return taxable * (topMarginalPct / 100) * 0.6;
}

// FICA: 6.2% Social Security + 1.45% Medicare. Ignores the Social Security wage base cap
// ($176,100 in 2025) which kicks in for higher earners; tool stays approximate.
export function ficaTax(gross: number): number {
  return gross * 0.0765;
}
