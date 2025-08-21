import type { Metadata } from 'next'
import '../styles/chat.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Portfolio Navigator',
  description: 'An intelligent, conversational portfolio website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
