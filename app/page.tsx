"use client";

import { useMemo, useState } from "react";
import {
  STATES,
  burdenTier,
  federalTax,
  ficaTax,
  stateIncomeTax,
  type StateRow,
  type Tier,
} from "@/lib/states";

type SortKey = "name" | "incomeTax" | "salesTax" | "propertyTax" | "col" | "tier";
type SortDir = "asc" | "desc";

function fmt(n: number, opts: Intl.NumberFormatOptions = {}): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0, ...opts });
}

function tierClass(t: Tier): string {
  if (t === "Low") return "bg-emerald-900/50 text-emerald-300 ring-1 ring-emerald-700/50";
  if (t === "Mid") return "bg-amber-900/50 text-amber-300 ring-1 ring-amber-700/50";
  return "bg-rose-900/50 text-rose-300 ring-1 ring-rose-700/50";
}

const tierRank: Record<Tier, number> = { Low: 0, Mid: 1, High: 2 };

export default function Page() {
  // --- Cribsheet state ---
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const enriched = useMemo(
    () => STATES.map((s) => ({ ...s, tier: burdenTier(s) })),
    []
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let rows = enriched;
    if (q) {
      rows = rows.filter(
        (r) => r.name.toLowerCase().includes(q) || r.code.toLowerCase().includes(q),
      );
    }
    const dir = sortDir === "asc" ? 1 : -1;
    const sorted = [...rows].sort((a, b) => {
      let va: number | string;
      let vb: number | string;
      if (sortKey === "name") {
        va = a.name; vb = b.name;
      } else if (sortKey === "tier") {
        va = tierRank[a.tier]; vb = tierRank[b.tier];
      } else {
        va = a[sortKey]; vb = b[sortKey];
      }
      if (va < vb) return -1 * dir;
      if (va > vb) return 1 * dir;
      return 0;
    });
    return sorted;
  }, [search, sortKey, sortDir, enriched]);

  function clickSort(k: SortKey) {
    if (sortKey === k) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(k);
      setSortDir(k === "name" ? "asc" : "desc");
    }
  }

  // --- Income calculator state ---
  const [grossStr, setGrossStr] = useState("100000");
  const [calcStateCode, setCalcStateCode] = useState("TX");

  const gross = Math.max(0, Number(grossStr.replace(/[^0-9.]/g, "")) || 0);
  const calcState = enriched.find((s) => s.code === calcStateCode) ?? enriched[0];

  const fedTax = federalTax(gross);
  const stTax = stateIncomeTax(gross, calcState.incomeTax);
  const fica = ficaTax(gross);
  const netAnnual = Math.max(0, gross - fedTax - stTax - fica);
  const netMonthly = netAnnual / 12;
  const colAdjMonthly = netMonthly / (calcState.col / 100);

  // --- Expenses calculator state ---
  const [mortgage, setMortgage] = useState("");
  const [cards, setCards] = useState("");
  const [auto, setAuto] = useState("");
  const [food, setFood] = useState("");
  const [utilities, setUtilities] = useState("");
  const [insurance, setInsurance] = useState("");
  const [otherDebt, setOtherDebt] = useState("");
  const [otherExp, setOtherExp] = useState("");

  const num = (s: string) => Math.max(0, Number(s.replace(/[^0-9.]/g, "")) || 0);
  const totalExpenses =
    num(mortgage) + num(cards) + num(auto) + num(food) + num(utilities) +
    num(insurance) + num(otherDebt) + num(otherExp);
  const disposable = netMonthly - totalExpenses;
  const disposablePct = netMonthly > 0 ? (disposable / netMonthly) * 100 : 0;
  let disposableTone = "text-rose-300";
  let disposableBg = "bg-rose-900/40 ring-rose-800/60";
  if (disposable > 0 && disposablePct > 20) {
    disposableTone = "text-emerald-300";
    disposableBg = "bg-emerald-900/40 ring-emerald-800/60";
  } else if (disposable >= 0) {
    disposableTone = "text-amber-300";
    disposableBg = "bg-amber-900/40 ring-amber-800/60";
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          US State Cost of Living + Disposable Income Tool
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-400 sm:text-base">
          Side by side cribsheet of state taxes and cost of living, plus a quick calculator that estimates federal
          + state tax, take home pay, and what is left after typical monthly expenses. Single filer, standard deduction,
          rough math. Useful for comparing relocation tradeoffs at a glance.
        </p>
      </header>

      {/* ============ CRIBSHEET ============ */}
      <section className="mb-12">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">State cribsheet</h2>
            <p className="text-sm text-zinc-500">Click a column header to sort. Filter by state name or code.</p>
          </div>
          <input
            type="text"
            placeholder="Filter by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 focus:outline-none sm:w-72"
          />
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-800">
          <table className="min-w-full divide-y divide-zinc-800 text-sm">
            <thead className="bg-zinc-900/60 text-left text-xs uppercase tracking-wide text-zinc-400">
              <tr>
                <Th onClick={() => clickSort("name")} active={sortKey === "name"} dir={sortDir}>State</Th>
                <Th onClick={() => clickSort("incomeTax")} active={sortKey === "incomeTax"} dir={sortDir} align="right">Income tax (top)</Th>
                <Th onClick={() => clickSort("salesTax")} active={sortKey === "salesTax"} dir={sortDir} align="right">Sales tax (combined)</Th>
                <Th onClick={() => clickSort("propertyTax")} active={sortKey === "propertyTax"} dir={sortDir} align="right">Property tax (effective)</Th>
                <Th onClick={() => clickSort("col")} active={sortKey === "col"} dir={sortDir} align="right">COL index</Th>
                <Th onClick={() => clickSort("tier")} active={sortKey === "tier"} dir={sortDir} align="center">Burden</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {filtered.map((s) => (
                <tr key={s.code} className="hover:bg-zinc-900/40">
                  <td className="px-3 py-2 font-medium">
                    <span className="text-zinc-400 text-xs mr-2">{s.code}</span>
                    {s.name}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">{s.incomeTax.toFixed(2)}%</td>
                  <td className="px-3 py-2 text-right tabular-nums">{s.salesTax.toFixed(2)}%</td>
                  <td className="px-3 py-2 text-right tabular-nums">{s.propertyTax.toFixed(2)}%</td>
                  <td className="px-3 py-2 text-right tabular-nums">{s.col.toFixed(1)}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${tierClass(s.tier)}`}>{s.tier}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-zinc-500">No states match that filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ============ INCOME CALCULATOR ============ */}
      <section className="mb-12">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Income calculator</h2>
          <p className="text-sm text-zinc-500">2024 federal brackets, single filer, $14,600 standard deduction. State effective rate approximated as 60 percent of top marginal.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
          {/* Sticky inputs */}
          <div className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 lg:sticky lg:top-4 lg:self-start">
            <Field label="Gross annual income ($)">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={grossStr}
                  onChange={(e) => setGrossStr(e.target.value)}
                  className="w-full rounded-md border border-zinc-800 bg-zinc-900 pl-7 pr-3 py-2 text-sm text-zinc-100 focus:border-zinc-600 focus:outline-none"
                />
              </div>
            </Field>

            <Field label="State">
              <select
                value={calcStateCode}
                onChange={(e) => setCalcStateCode(e.target.value)}
                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-zinc-600 focus:outline-none"
              >
                {enriched.map((s) => (
                  <option key={s.code} value={s.code} className="bg-zinc-900">{s.name}</option>
                ))}
              </select>
            </Field>

            <div className="rounded-md border border-zinc-800/60 bg-zinc-950/60 p-3 text-xs text-zinc-500">
              <div>State income tax (top): {calcState.incomeTax.toFixed(2)}%</div>
              <div>Cost of living index: {calcState.col.toFixed(1)}</div>
            </div>
          </div>

          {/* Outputs */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Stat label="Federal tax" value={`$${fmt(fedTax)}`} sub={`${fmt((fedTax / Math.max(1, gross)) * 100, { maximumFractionDigits: 1 })}% of gross`} />
            <Stat label="State income tax" value={`$${fmt(stTax)}`} sub={`${fmt((stTax / Math.max(1, gross)) * 100, { maximumFractionDigits: 1 })}% of gross`} />
            <Stat label="FICA (7.65%)" value={`$${fmt(fica)}`} sub="Social Security + Medicare" />
            <Stat label="Net annual" value={`$${fmt(netAnnual)}`} sub={`${fmt((netAnnual / Math.max(1, gross)) * 100, { maximumFractionDigits: 1 })}% take home`} />
            <Stat label="Net monthly" value={`$${fmt(netMonthly)}`} sub="Take home divided by 12" />
            <Stat label="COL adjusted monthly" value={`$${fmt(colAdjMonthly)}`} sub={`Buying power vs US avg (COL ${calcState.col.toFixed(1)})`} />
          </div>
        </div>
      </section>

      {/* ============ EXPENSES ============ */}
      <section className="mb-12">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Real disposable income</h2>
          <p className="text-sm text-zinc-500">Fill what you actually spend per month. Leave blank what does not apply. Real disposable updates live.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
          <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 lg:sticky lg:top-4 lg:self-start">
            <MoneyField label="Mortgage / rent" value={mortgage} onChange={setMortgage} />
            <MoneyField label="Credit card payments" value={cards} onChange={setCards} />
            <MoneyField label="Auto loan" value={auto} onChange={setAuto} />
            <MoneyField label="Food / groceries" value={food} onChange={setFood} />
            <MoneyField label="Utilities" value={utilities} onChange={setUtilities} sub="electric, gas, water, internet, phone" />
            <MoneyField label="Insurance" value={insurance} onChange={setInsurance} sub="health, auto, life" />
            <MoneyField label="Other debt" value={otherDebt} onChange={setOtherDebt} sub="student loans, personal loans" />
            <MoneyField label="Other expenses" value={otherExp} onChange={setOtherExp} sub="kids, daycare, subscriptions" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Stat label="Total monthly expenses" value={`$${fmt(totalExpenses)}`} sub={netMonthly > 0 ? `${fmt((totalExpenses / netMonthly) * 100, { maximumFractionDigits: 1 })}% of take home` : ""} />
            <div className={`rounded-lg p-4 ring-1 ${disposableBg}`}>
              <div className="text-xs uppercase tracking-wide text-zinc-400">Real disposable income</div>
              <div className={`mt-1 text-2xl font-semibold tabular-nums ${disposableTone}`}>
                {disposable < 0 ? "-$" : "$"}{fmt(Math.abs(disposable))}<span className="text-sm font-normal text-zinc-400"> / month</span>
              </div>
              <div className="mt-1 text-xs text-zinc-400">
                {netMonthly > 0 ? `${fmt(disposablePct, { maximumFractionDigits: 1 })}% of your take home` : "Enter income to see percentages"}
              </div>
            </div>
            <Stat label="Net monthly income" value={`$${fmt(netMonthly)}`} sub="From calculator above" />
            <Stat label="Annual disposable" value={`${disposable < 0 ? "-$" : "$"}${fmt(Math.abs(disposable * 12))}`} sub="12 x monthly disposable" />
          </div>
        </div>
      </section>

      <footer className="mt-16 border-t border-zinc-900 pt-6 text-xs text-zinc-500">
        <p>
          Tax math is approximate. Single filer, standard deduction only. Does not account for itemized deductions, dependents,
          HSA / 401k contributions, AMT, capital gains, NIIT, or local payroll taxes outside FICA. State income tax modeled at 60 percent
          of top marginal rate on income above $5,000 to approximate a realistic effective rate. New Hampshire and Tennessee shown as 0 percent on wages
          (both tax interest and dividends only). Data sources: Tax Foundation (2024 rates) and MERIC Q4 2023 cost of living index. Numbers shift annually,
          treat this as a rough cribsheet, not advice.
        </p>
      </footer>
    </main>
  );
}

function Th({
  children,
  onClick,
  active,
  dir,
  align,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  dir: SortDir;
  align?: "left" | "right" | "center";
}) {
  const alignClass = align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";
  return (
    <th className={`px-3 py-2 font-medium ${alignClass}`}>
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-1 hover:text-zinc-200 ${active ? "text-zinc-100" : ""}`}
      >
        {children}
        {active && <span className="text-zinc-500">{dir === "asc" ? "▲" : "▼"}</span>}
      </button>
    </th>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</span>
      {children}
    </label>
  );
}

function MoneyField({
  label,
  value,
  onChange,
  sub,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  sub?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-zinc-300">{label}</span>
      {sub && <span className="mb-1 block text-[10px] text-zinc-500">{sub}</span>}
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
        <input
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-zinc-800 bg-zinc-900 pl-7 pr-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
        />
      </div>
    </label>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="text-xs uppercase tracking-wide text-zinc-400">{label}</div>
      <div className="mt-1 text-xl font-semibold tabular-nums">{value}</div>
      {sub && <div className="mt-1 text-xs text-zinc-500">{sub}</div>}
    </div>
  );
}
