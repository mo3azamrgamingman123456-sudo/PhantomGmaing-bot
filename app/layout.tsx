import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "PhantomGmaing-bot | Bot Hosting", description: "Discord bot hosting control panel" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}