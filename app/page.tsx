'use client'

import { useState } from 'react'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-background text-foreground">
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent text-background px-4 py-2 z-[100] focus:outline-none focus:ring-2 focus:ring-accent-alt"
      >
        Skip to main content
      </a>
      
      {/* Full-Viewport Hero */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Navigation */}
        <nav className="fixed top-8 left-8 right-8 z-50 flex justify-between items-center">
          <div className="text-foreground font-display font-bold tracking-tight">
            Etay Naor
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider font-medium">
            <a 
              href="#work" 
              className="text-muted hover:text-accent transition-colors focus:outline-none focus:text-accent focus:ring-2 focus:ring-accent/50 px-2 py-1 rounded"
            >
              Work
            </a>
            <a 
              href="#about" 
              className="text-muted hover:text-accent transition-colors focus:outline-none focus:text-accent focus:ring-2 focus:ring-accent/50 px-2 py-1 rounded"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-muted hover:text-accent transition-colors focus:outline-none focus:text-accent focus:ring-2 focus:ring-accent/50 px-2 py-1 rounded"
            >
              Contact
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:text-accent p-2 rounded"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
        
        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed top-0 right-0 bottom-0 w-80 bg-background border-l border-muted/20 z-50 md:hidden">
              <div className="p-8 space-y-8">
                <div className="text-right">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent p-2 rounded"
                    aria-label="Close navigation menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <nav className="space-y-6" role="navigation" aria-label="Mobile navigation">
                  <a 
                    href="#work" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xl text-muted hover:text-accent transition-colors focus:outline-none focus:text-accent focus:ring-2 focus:ring-accent/50 px-4 py-3 rounded uppercase tracking-wider font-medium"
                  >
                    Work
                  </a>
                  <a 
                    href="#about" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xl text-muted hover:text-accent transition-colors focus:outline-none focus:text-accent focus:ring-2 focus:ring-accent/50 px-4 py-3 rounded uppercase tracking-wider font-medium"
                  >
                    About
                  </a>
                  <a 
                    href="#contact" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xl text-muted hover:text-accent transition-colors focus:outline-none focus:text-accent focus:ring-2 focus:ring-accent/50 px-4 py-3 rounded uppercase tracking-wider font-medium"
                  >
                    Contact
                  </a>
                </nav>
              </div>
            </div>
          </>
        )}

        {/* Hero Layout */}
        <main id="main-content">
          <div className="min-h-screen grid grid-cols-12 gap-8 px-8">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center space-y-12 py-20">
              <div className="space-y-8">
                <div className="text-xs uppercase tracking-[0.3em] text-muted font-medium">
                  Creative Strategist
                </div>
                
                <h1 className="text-7xl lg:text-8xl font-display font-black leading-[0.85] tracking-tight">
                  Etay<br/>
                  <span className="text-accent">Naor</span>
                </h1>
                
                <div className="w-32 h-px bg-muted"></div>
                
                <p className="text-xl leading-relaxed max-w-lg font-light">
                  Over the past 15+ years, I've been sharing aha moments with companies, startups, and movements — turning that into bold execution, specializing in creative strategy, viral campaigns, and product innovation.
                </p>
              </div>

              <div className="flex items-center space-x-8">
                <a 
                  href="#work"
                  className="bg-accent text-background px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent-alt focus:ring-offset-2 focus:ring-offset-background"
                >
                  View Work
                </a>
                <div className="flex items-center space-x-4 text-xs uppercase tracking-wider text-muted">
                  <span>Currently at Allenby</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-12 lg:col-span-5 relative flex items-center justify-end">
              <div className="relative">
                <div className="w-80 h-96 bg-surface relative overflow-hidden">
                  <img
                    src="/etay-profile.jpg"
                    alt="Etay Naor"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4">
            <div className="text-xs uppercase tracking-wider text-muted">Scroll to see work</div>
            <div className="w-px h-16 bg-muted animate-pulse"></div>
          </div>
        </main>
      </section>

      {/* Work Section */}
      <section id="work" className="bg-background">
        <div className="px-8 py-32">
          <h2 className="text-6xl lg:text-7xl font-display font-black text-center mb-32">
            Recent Work
          </h2>

          {/* SodaStream */}
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="/sodastream-campaign.jpg"
                  alt="SodaStream campaign"
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h3 className="text-4xl font-display font-black">SodaStream</h3>
                <p className="text-lg leading-relaxed text-muted">
                  Helped reposition SodaStream from kitchen gadget to environmental statement. 
                  Bold "F*ck Plastic Bottles" messaging led directly to PepsiCo's $2.3B acquisition — the ultimate validation of strategic repositioning.
                </p>
                <div className="text-sm uppercase tracking-[0.2em] text-muted">
                  Creative Strategy
                </div>
              </div>
            </div>
          </div>

          {/* Spotify */}
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-4xl font-display font-black">Spotify Israel</h3>
                <p className="text-lg leading-relaxed text-muted">
                  Creator-first launch strategy achieving 200% of user acquisition targets through authentic local approach, not generic global rollout.
                </p>
                <div className="text-sm uppercase tracking-[0.2em] text-muted">
                  Lead Strategic Architect
                </div>
              </div>
              <div>
                <img
                  src="/spotify-campaign.jpg"
                  alt="Spotify campaign"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Tourism */}
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="/tourist-campaign.jpg"
                  alt="Tourism campaign"
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h3 className="text-4xl font-display font-black">Israeli Ministry of Tourism</h3>
                <p className="text-lg leading-relaxed text-muted">
                  Multi-platform campaign positioning Tel Aviv and Jerusalem as premier urban destinations. 
                  Result: 38% increase in European tourists and 13.5M engaged clicks.
                </p>
                <div className="text-sm uppercase tracking-[0.2em] text-muted">
                  Campaign Strategy
                </div>
              </div>
            </div>
          </div>

          {/* Maccabee */}
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-4xl font-display font-black">Maccabee Beer</h3>
                <p className="text-lg leading-relaxed text-muted">
                  Transform failing beer brand and rebuild relevance with younger demographic. 
                  Targeted hipster community engagement with creator partnerships. Campaign became #2 most-watched video on YouTube Israel.
                </p>
                <div className="text-sm uppercase tracking-[0.2em] text-muted">
                  Creative Direction
                </div>
              </div>
              <div>
                <img
                  src="/maccabee-campaign.jpg"
                  alt="Maccabee campaign"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 bg-surface/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-5xl font-display font-black mb-8">About</h2>
              <div className="space-y-6 text-lg leading-relaxed font-light">
                <p>
                  I've worked with major brands like Spotify, Budweiser, and SodaStream, early-stage startups, and national election campaigns. 
                </p>
                <p>
                  I'm co-owner at Allenby Concept House, where we lead strategy, product positioning, innovation work, and impactful delivery for companies at different stages.
                </p>
                <p>
                  Skilled at translating complex ideas into sharp, actionable strategy and creative execution. Fully embedded in AI workflows. Geek.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-display font-bold mb-4">How I Help</h3>
                <ul className="space-y-3 text-muted font-light">
                  <li>• Turn complex positioning into sharp strategy</li>
                  <li>• Build campaigns that actually spread</li>
                  <li>• Find the message that makes people care</li>
                  <li>• Bridge strategy and creative execution</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl font-display font-black">
              Let's Work Together
            </h2>
            
            <p className="text-xl leading-relaxed font-light text-muted">
              Working on something interesting? Let's talk about it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:etay@example.com"
              className="bg-accent text-background px-8 py-3 text-sm uppercase tracking-wider font-semibold hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent-alt focus:ring-offset-2 focus:ring-offset-background"
            >
              Email Me
            </a>
            <a 
              href="https://calendly.com/etay-naor"
              className="border border-muted text-foreground px-8 py-3 text-sm uppercase tracking-wider font-semibold hover:border-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            >
              Schedule Call
            </a>
          </div>

          <div className="text-sm text-muted font-light">
            Based in Tel Aviv • Work globally • Usually respond within 24 hours
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-muted/20 py-8 px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-muted">
          <div>© 2025 Etay Naor</div>
          <div className="hidden sm:block">Creative Strategist</div>
        </div>
      </footer>
    </div>
  )
}