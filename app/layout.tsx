import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bioarchitettura - Rivista Italiana di Bioarchitettura',
  description: 'Rivista italiana di architettura sostenibile, corsi master, webinar ed e-books',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
