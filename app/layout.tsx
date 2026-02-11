import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = GeistSans;

const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Pejota",
  description: "Plataforma de gestão para prestadores de serviços.",
};

/* 
Explaining suppressHydrationWarning:
Mismatch occours from theme resolving from localStorage vs. system preference when trying to apply next-themes:
1. Server HTML → no dark 
2. Client hydration → adds dark
3. React → mismatch → hydration warning → re-render

The server renders <html> without the theme, and the client adds dark immediately. React correctly flags this as a hydration mismatch.
"I know the HTML may differ on first render. That’s expected." -> hard required when using next-themes.

DO NOT REMOVE.
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
