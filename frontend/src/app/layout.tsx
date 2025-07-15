import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'GoGeo Travels London - Premium Transportation Services',
  description: 'Experience luxury transportation in London with our premium helicopters, private jets, executive buses, and private cars. Book your exclusive journey today.',
  keywords: 'London transport, helicopter rental, private jet, luxury bus, private car, premium transportation, GoGeo Travels',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
