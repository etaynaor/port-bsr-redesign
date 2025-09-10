import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Etay Naor',
  description: 'Partner & Lead Strategist, Allenby',
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
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { 
              const apply = (mode) => {
                const on = mode === 'dark';
                const root = document.documentElement;
                const body = document.body;
                root.classList.toggle('dark', on);
                body.classList.toggle('dark', on);
                try { document.getElementById('__next')?.classList.toggle('dark', on); } catch(_){}
                try { document.querySelector('[data-theme-root]')?.classList.toggle('dark', on); } catch(_){}
              };
              const saved = localStorage.getItem('theme');
              const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              const mode = saved ? saved : (prefersDark ? 'dark' : 'light');
              apply(mode);
              const setCookie = (m) => { try { document.cookie = 'theme=' + m + '; Path=/; Max-Age=' + (60*60*24*365) + '; SameSite=Lax'; } catch(_){} };
              window.__setTheme = (m) => { try { localStorage.setItem('theme', m); setCookie(m); apply(m); } catch(_){} };
              // Re-apply on storage changes or visibility restore
              window.addEventListener('storage', (e) => { if (e.key === 'theme' && e.newValue) apply(e.newValue); });
              document.addEventListener('visibilitychange', () => { const t = localStorage.getItem('theme'); if (t) apply(t); });
            } catch(_){} })();`,
          }}
        />
        {process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{\"token\": \"${process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN}\"}`}
          />
        ) : null}
      </head>
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
