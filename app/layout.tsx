import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Etay Naor — Portfolio',
  description: 'Private portfolio for prospects',
  robots: { index: false, follow: false },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-foreground focus:text-background focus:px-3 focus:py-2">
          Skip to content
        </a>
        <main id="content">
          {children}
        </main>
      </body>
    </html>
  )
}
