import type { Metadata } from 'next'
import '../src/styles/chat.css'
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
    <html lang="en" style={{ height: '100%' }}>
      <body 
        className="antialiased" 
        style={{ 
          margin: 0, 
          padding: 0, 
          height: '100vh',
          width: '100vw',
          overflow: 'hidden'
        }}
      >
        <div 
          id="__next" 
          style={{ 
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {children}
        </div>
      </body>
    </html>
  )
}
