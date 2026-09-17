import "./globals.css"
import "@fontsource/ibm-plex-sans/400.css"
import "@fontsource/ibm-plex-sans/500.css"
import "@fontsource/ibm-plex-sans/600.css"
import "@fontsource/ibm-plex-mono/400.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Electronicweb — Practical tech, delivered",
  description: "Shop reliable electronics with instant guest checkout, eSewa payment, and verified delivery.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
