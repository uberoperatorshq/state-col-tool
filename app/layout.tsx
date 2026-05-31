import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "US State Cost of Living + Disposable Income Tool",
  description:
    "Quick reference for state taxes, cost of living, and real take home income across all 50 US states + DC. No login, no tracking, all client side.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
