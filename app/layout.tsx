import type { Metadata } from "next";
import { Bebas_Neue, Carrois_Gothic } from 'next/font/google'
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
})

const carroisGothic = Carrois_Gothic({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-carrois-gothic',
})

export const metadata: Metadata = {
  title: "H5 Website",
  description: "Official Hostel 5 website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Carrois+Gothic+SC&family=Carlito:wght@700&display=swap" //importing fonts that are used in figma
          rel="stylesheet"
        />
      </head>
      <body
        className={`${bebasNeue.variable} ${carroisGothic.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
