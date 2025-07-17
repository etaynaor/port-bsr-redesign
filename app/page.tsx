"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Portfolio() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const slides = [
    { component: <TitleSlide />, title: "Title" },
    { component: <AboutSlide />, title: "About" },
    { component: <PortfolioDivider />, title: "Portfolio" },
    { component: <SodaStreamIntroSlide />, title: "SodaStream Intro" },
    { component: <SodaStreamDetailSlide />, title: "SodaStream Details" },
    { component: <SpotifyIntroSlide />, title: "Spotify Intro" },
    { component: <SpotifyDetailSlide />, title: "Spotify Details" },
    { component: <TourismIntroSlide />, title: "Tourism Intro" },
    { component: <TourismDetailSlide />, title: "Tourism Details" },
    { component: <MaccabeeIntroSlide />, title: "Maccabee Intro" },
    { component: <MaccabeeDetailSlide />, title: "Maccabee Details" },
    { component: <CapabilitiesSlide />, title: "Capabilities" },
    { component: <ThankYouSlide />, title: "Thank You" },
  ]

  // Intersection Observer to track current slide
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideIndex = slideRefs.current.findIndex((ref) => ref === entry.target)
            if (slideIndex !== -1) {
              setCurrentSlide(slideIndex)
            }
          }
        })
      },
      {
        threshold: 0.5,
        rootMargin: "0px",
      },
    )

    slideRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const nextSlide = () => {
    const nextIndex = Math.min(currentSlide + 1, slides.length - 1)
    scrollToSlide(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = Math.max(currentSlide - 1, 0)
    scrollToSlide(prevIndex)
  }

  const goToSlide = (index: number) => {
    scrollToSlide(index)
  }

  const scrollToSlide = (index: number) => {
    const slideElement = slideRefs.current[index]
    if (slideElement) {
      slideElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div className="w-full h-screen relative overflow-hidden font-['Poppins',sans-serif]">
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto scroll-smooth snap-y snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => (slideRefs.current[index] = el)}
            className="w-full h-screen snap-start snap-always flex-shrink-0"
          >
            {slide.component}
          </div>
        ))}
      </div>

      {/* Navigation Controls - Hidden on Mobile */}
      <NavigationControls
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onNext={nextSlide}
        onPrev={prevSlide}
        onGoTo={goToSlide}
        slides={slides}
      />
    </div>
  )
}

// Navigation Controls Component
function NavigationControls({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onGoTo,
  slides,
}: {
  currentSlide: number
  totalSlides: number
  onNext: () => void
  onPrev: () => void
  onGoTo: (index: number) => void
  slides: { title: string }[]
}) {
  return (
    <div className="fixed bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
      <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 md:px-6 py-3 md:py-4 shadow-2xl border border-white/20">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Previous Button */}
          <button
            onClick={onPrev}
            disabled={currentSlide === 0}
            className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-1 md:gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => onGoTo(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 hover:scale-125 ${
                  index === currentSlide ? "bg-purple-600 scale-125" : "bg-gray-300 hover:bg-purple-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-1 md:mt-2">
          <span className="text-xs md:text-sm text-purple-900 font-medium">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>
      </div>
    </div>
  )
}

// Creative burst elements component
function CreativeBurst({
  className = "",
  size = "large",
}: { className?: string; size?: "small" | "medium" | "large" }) {
  const sizeClasses = {
    small: "w-16 h-16 md:w-32 md:h-32",
    medium: "w-24 h-24 md:w-48 md:h-48",
    large: "w-32 h-32 md:w-64 md:h-64",
  }

  return (
    <div className={`absolute ${sizeClasses[size]} ${className}`}>
      {/* Squiggly lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <path d="M10,20 Q20,10 30,20 T50,20" stroke="#FF6B9D" strokeWidth="2" fill="none" className="animate-pulse" />
        <path
          d="M60,30 Q70,20 80,30 T100,30"
          stroke="#4ECDC4"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <path
          d="M20,60 Q30,50 40,60 T60,60"
          stroke="#FFE66D"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <path
          d="M70,70 Q80,60 90,70 T110,70"
          stroke="#A8E6CF"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </svg>

      {/* Scattered elements */}
      <div className="absolute top-4 left-8 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
      <div
        className="absolute top-12 right-6 w-2 h-2 bg-pink-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.3s" }}
      ></div>
      <div
        className="absolute bottom-8 left-4 w-4 h-4 bg-cyan-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.6s" }}
      ></div>
      <div
        className="absolute bottom-4 right-8 w-2 h-2 bg-purple-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.9s" }}
      ></div>

      {/* Star shapes */}
      <div className="absolute top-16 right-12 text-yellow-400 text-xl animate-pulse">⭐</div>
      <div
        className="absolute bottom-16 left-12 text-pink-400 text-lg animate-pulse"
        style={{ animationDelay: "0.7s" }}
      >
        ✨
      </div>
    </div>
  )
}

function TitleSlide() {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ backgroundColor: "#1a1a2e" }}>
      {/* Creative burst elements */}
      <CreativeBurst className="top-10 left-10 opacity-60" size="large" />
      <CreativeBurst className="bottom-10 right-10 opacity-40" size="medium" />
      <CreativeBurst className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20" size="large" />

      <div className="flex items-center justify-center h-full relative z-10 px-4 md:px-8">
        <div className="text-center">
          <div className="mb-6 md:mb-8">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freepik_assistant_1752747533350-l7w48Zbqk0vjy7pFj7HBrnGTruyj9W.png"
              alt="Etay Naor Creative Leader"
              className="mx-auto max-w-3xl md:max-w-4xl w-full drop-shadow-2xl"
            />
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 max-w-xl md:max-w-2xl mx-auto shadow-2xl border-2 border-purple-200">
            <p className="text-base md:text-xl text-purple-900 font-medium leading-relaxed">
              Hi friend, here's my portfolio
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AboutSlide() {
  return (
    <div
      className="w-full h-full p-4 md:p-12 flex flex-col overflow-hidden relative"
      style={{ backgroundColor: "#1a1a2e" }}
    >
      {/* Creative elements */}
      <CreativeBurst className="top-0 right-0 opacity-30" size="medium" />
      <CreativeBurst className="bottom-0 left-0 opacity-20" size="small" />

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col relative z-10">
        <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 leading-none tracking-tight text-white">
          ABOUT ETAY
        </h2>

        <div className="inline-block bg-gradient-to-r from-yellow-400 to-pink-400 text-purple-900 px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-bold mb-6 md:mb-8 shadow-lg">
          Partner & Lead Strategist at Allenby Concept House
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center flex-1 space-y-6">
          {/* Large Photo for Mobile */}
          <div className="flex justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 relative">
                <CreativeBurst className="inset-0" size="large" />
              </div>
            </div>
            <div className="w-64 h-64 rounded-full overflow-hidden border-6 border-white shadow-2xl relative z-10">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_qrPR982XbOxjVlzYFdBlECpSvORA/zGmr7OHzKdtR0CSV2Sc16t/public/etay-profile.jpg"
                alt="Etay Naor Professional Photo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content for Mobile - Shortened */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-purple-900 mb-3 leading-tight">
              15+ years leading creative strategy for global brands
            </h3>
            <p className="text-sm text-purple-800 leading-relaxed">
              I've been turning aha moments into bold execution for companies, startups, and movements. Worked with
              major brands like Spotify, Budweiser, and SodaStream.
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-2 gap-12 items-start flex-1 min-h-0">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-8 shadow-2xl overflow-y-auto">
            <h3 className="text-3xl font-bold text-purple-900 mb-6 leading-tight">
              15+ years leading creative strategy for global brands
            </h3>
            <p className="text-base text-purple-800 leading-relaxed">
              Over the past 15+ years, I've been sharing aha moments with companies, startups, and movements – and turning them into bold execution. I've worked with major brands like Spotify, Budweiser, and SodaStream, early-stage startups, human rights organizations and election campaigns.
            </p>
          </div>

          <div className="flex justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 relative">
                <CreativeBurst className="inset-0" size="large" />
              </div>
            </div>
            <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_qrPR982XbOxjVlzYFdBlECpSvORA/zGmr7OHzKdtR0CSV2Sc16t/public/etay-profile.jpg"
                alt="Etay Naor Professional Photo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PortfolioDivider() {
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#1a1a2e" }}
    >
      {/* Multiple creative bursts */}
      <CreativeBurst className="top-10 left-10 opacity-40" size="large" />
      <CreativeBurst className="top-10 right-10 opacity-30" size="medium" />
      <CreativeBurst className="bottom-10 left-10 opacity-25" size="medium" />
      <CreativeBurst className="bottom-10 right-10 opacity-35" size="large" />

      <div className="text-center z-10 relative px-4">
        <div className="flex items-center justify-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freepik_assistant_1752746707625-c1EFYPDAkBPvd3O8wzxL0QRKXlCXbL.png"
            alt="Campaign Portfolio - Viral Successes & Creative Leadership"
            className="max-w-4xl md:max-w-6xl w-full drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  )
}

// SodaStream Case Study - Slide 1: Logo → Subtitle → Image
function SodaStreamIntroSlide() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative"
      style={{ backgroundColor: "#1a1a2e" }}
    >
      <CreativeBurst className="top-0 left-0 opacity-20" size="medium" />
      <CreativeBurst className="bottom-0 right-0 opacity-25" size="large" />

      <div className="max-w-4xl md:max-w-6xl mx-auto text-center relative z-10 space-y-4 md:space-y-4">
        {/* 1. Optimized Logo Size */}
        <div className="mb-2 md:mb-3">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_qrPR982XbOxjVlzYFdBlECpSvORA/BV02uLDMBb59DJi-Ievd2f/public/sodastream-logo.png"
            alt="SodaStream"
            className="mx-auto max-w-xl md:max-w-2xl w-full drop-shadow-2xl"
          />
        </div>

        {/* 2. Subtitle */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-2xl">
          <p className="text-sm md:text-lg text-purple-900 font-medium">
            "Shame or Glory" Campaign - Contributing to $2.3B PepsiCo Acquisition
          </p>
        </div>

        {/* 3. Image with adjusted spacing */}
        <div className="w-full max-w-2xl md:max-w-3xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-white">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_qrPR982XbOxjVlzYFdBlECpSvORA/Bp4d0d8a9HIb2EifLLDcIa/public/shame-or-glory-campaign.jpg"
            alt="SodaStream Shame or Glory Campaign Visual"
            className="w-full h-48 md:h-64 object-cover"
          />
        </div>
      </div>
    </div>
  )
}

// SodaStream Case Study - Slide 2: Mobile-First Design
function SodaStreamDetailSlide() {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ backgroundColor: "#1a1a2e" }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_qrPR982XbOxjVlzYFdBlECpSvORA/s7p7KUxnwnXc5vKhzSov7t/public/sodastream-campaign.jpg"
          alt="SodaStream Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <CreativeBurst className="top-10 right-10 opacity-30" size="medium" />
      <CreativeBurst className="bottom-10 left-10 opacity-25" size="small" />

      {/* Mobile Layout */}
      <div className="md:hidden relative z-10 h-full p-4 overflow-y-auto pb-20">
        <div className="space-y-4">
          {/* Header Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl text-center">
            <h2 className="text-2xl font-black text-purple-900 mb-2">SODASTREAM</h2>
            <div className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white px-3 py-1 rounded-full text-xs font-bold">
              My Role: Creative Strategist
            </div>
          </div>

          {/* Challenge Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-l-4 border-pink-400">
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
              The Challenge
            </h3>
            <p className="text-sm text-purple-800 leading-relaxed">
              Transform SodaStream from budget soda maker to premium environmental lifestyle brand through strategic
              repositioning and viral social campaigns.
            </p>
          </div>

          {/* Strategy Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-l-4 border-cyan-400">
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
              Creative Strategy
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-cyan-500 text-sm">•</span>
                <span className="text-sm text-purple-800">Bold "F*ck Plastic Bottles" messaging campaign</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-500 text-sm">•</span>
                <span className="text-sm text-purple-800">Game of Thrones celebrity integration strategy</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-500 text-sm">•</span>
                <span className="text-sm text-purple-800">Social-first viral content across platforms</span>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4 text-white shadow-xl">
            <h3 className="text-lg font-bold mb-3 text-center">Results</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">Viral Success</div>
                <div className="text-xs text-purple-100 mt-1">Massive reach achieved</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">$2.3B Acquisition</div>
                <div className="text-xs text-purple-100 mt-1">PepsiCo purchase</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">Award-Winning</div>
                <div className="text-xs text-purple-100 mt-1">Campaign excellence</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">Brand Elevation</div>
                <div className="text-xs text-purple-100 mt-1">Premium positioning</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (unchanged) */}
      <div className="hidden md:block relative z-10 h-full p-10 overflow-y-auto pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl">
            <h2 className="text-4xl font-black mb-4 leading-none tracking-tight text-purple-900">SODASTREAM</h2>
            <h3 className="text-xl text-purple-700 mb-4 leading-tight font-medium">
              "Shame or Glory" Campaign - Contributing to $2.3B PepsiCo Acquisition
            </h3>
            <div className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full text-sm font-bold">
              My Role: Creative Strategist & Campaign Development
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-purple-900 mb-3">The Challenge</h4>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Transform SodaStream through integrated creative strategy and repositioning
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Moving from a utilitarian brand selling sweetened soda alternatives to a premium environmental
                        lifestyle choice
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-purple-900 mb-3">Creative Strategy</h4>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Strategic repositioning: shifted brand perception from budget sweetened soda maker to premium
                        sparkling water environmental champion
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Content-first creative strategy with bold "F*ck Plastic Bottles" messaging campaign
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Smart casting strategy: leveraged Game of Thrones popularity through social media amplification
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Platform-native creative adaptation across social channels to maximize cultural impact
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Integrated campaign architecture across multiple touchpoints
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-purple-900 mb-3">Campaign Elements</h4>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold">→</span>
                      <span className="text-purple-800">Award-winning "Shame or Glory" viral video</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold">→</span>
                      <span className="text-purple-800">Celebrity spokesperson integration (Game of Thrones)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold">→</span>
                      <span className="text-purple-800">Paris Hilton product collaboration campaigns</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                  <h4 className="text-xl font-bold mb-4">Results</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">Cultural Impact</div>
                      <div className="text-sm text-purple-100">"Shame or Glory" achieved massive cultural reach</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">$2.3B Acquisition</div>
                      <div className="text-sm text-purple-100">
                        Strategic repositioning contributed to PepsiCo acquisition
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">Award-Winning</div>
                      <div className="text-sm text-purple-100">Recognized campaign excellence</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">Brand Elevation</div>
                      <div className="text-sm text-purple-100">Transformed from utility to premium lifestyle brand</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Spotify Case Study - Slide 1: Logo → Subtitle → Image
function SpotifyIntroSlide() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative"
      style={{ backgroundColor: "#1a1a2e" }}
    >
      <CreativeBurst className="top-0 right-0 opacity-20" size="large" />
      <CreativeBurst className="bottom-0 left-0 opacity-25" size="medium" />

      <div className="max-w-4xl md:max-w-6xl mx-auto text-center relative z-10 space-y-4 md:space-y-6">
        {/* 1. Transparent Logo */}
        <div className="mb-3 md:mb-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_qrPR982XbOxjVlzYFdBlECpSvORA/sOjRPQ4ta9SaAD_aQlpLBw/public/spotify-logo.png"
            alt="Spotify"
            className="mx-auto max-w-2xl md:max-w-3xl w-full drop-shadow-2xl"
          />
        </div>

        {/* 2. Subtitle */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-3 md:p-5 shadow-2xl">
          <p className="text-sm md:text-lg text-purple-900 font-medium">Creator-First Media Launch Strategy</p>
        </div>

        {/* 3. Image in Original Position */}
        <div className="w-full max-w-3xl md:max-w-4xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-white">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_qrPR982XbOxjVlzYFdBlECpSvORA/PrJ82pe7vLute6gjU4Whvm/public/spotify-campaign.jpg"
            alt="Spotify Campaign Visual"
            className="w-full h-56 md:h-80 object-cover"
          />
        </div>
      </div>
    </div>
  )
}

// Spotify Case Study - Slide 2: Mobile-First Design
function SpotifyDetailSlide() {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ backgroundColor: "#1a1a2e" }}>
      <div className="absolute inset-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_qrPR982XbOxjVlzYFdBlECpSvORA/PrJ82pe7vLute6gjU4Whvm/public/spotify-campaign.jpg"
          alt="Spotify Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <CreativeBurst className="top-10 left-10 opacity-30" size="medium" />
      <CreativeBurst className="bottom-10 right-10 opacity-25" size="small" />

      {/* Mobile Layout */}
      <div className="md:hidden relative z-10 h-full p-4 overflow-y-auto pb-20">
        <div className="space-y-4">
          {/* Header Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl text-center">
            <h2 className="text-2xl font-black text-purple-900 mb-2">SPOTIFY</h2>
            <div className="inline-block bg-gradient-to-r from-green-400 to-blue-400 text-white px-3 py-1 rounded-full text-xs font-bold">
              My Role: Lead Strategic Architect
            </div>
          </div>

          {/* Challenge Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-l-4 border-green-400">
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              The Challenge
            </h3>
            <p className="text-sm text-purple-800 leading-relaxed">
              Launch Spotify in Israel with authentic community integration and localized cultural approach.
            </p>
          </div>

          {/* Strategy Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-l-4 border-blue-400">
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Creative Strategy
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">•</span>
                <span className="text-sm text-purple-800">Creator-first launch with Israeli musicians</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">•</span>
                <span className="text-sm text-purple-800">Platform-specific social amplification</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">•</span>
                <span className="text-sm text-purple-800">Authentic local music partnerships</span>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-xl p-4 text-white shadow-xl">
            <h3 className="text-lg font-bold mb-3 text-center">Results</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">200% Target</div>
                <div className="text-xs text-green-100 mt-1">Doubled subscribers</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">Market Success</div>
                <div className="text-xs text-green-100 mt-1">Successful entry</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">Regional Recognition</div>
                <div className="text-xs text-green-100 mt-1">Top launch success</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">Community Built</div>
                <div className="text-xs text-green-100 mt-1">Strong user base</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (unchanged) */}
      <div className="hidden md:block relative z-10 h-full p-10 overflow-y-auto pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl">
            <h2 className="text-4xl font-black mb-4 leading-none tracking-tight text-purple-900">SPOTIFY</h2>
            <h3 className="text-xl text-purple-700 mb-4 leading-tight font-medium">
              Creator-First Media Launch Strategy
            </h3>
            <div className="inline-block bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-full text-sm font-bold">
              My Role: Lead Strategic Architect for Market Entry
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-purple-900 mb-3">The Challenge</h4>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Launch Spotify in Israel with unique local cultural challenges requiring authentic community
                        integration and localized approach
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-purple-900 mb-3">Creative Strategy</h4>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Creator-first launch strategy featuring leading Israeli musicians
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Platform-specific content designed for cultural amplification
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Integrated campaign spanning video, OOH, and digital media
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">→</span>
                      <span className="text-purple-800">Authentic local music community partnerships</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-purple-900 mb-3">Campaign Execution</h4>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 font-bold">→</span>
                      <span className="text-purple-800">Video campaigns featuring top Israeli artists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 font-bold">→</span>
                      <span className="text-purple-800">Strategic social media distribution across platforms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 font-bold">→</span>
                      <span className="text-purple-800">Local messaging and cultural authenticity</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-6 text-white">
                  <h4 className="text-xl font-bold mb-4">Results</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">200% Target Achievement</div>
                      <div className="text-sm text-green-100">Doubled subscriber targets for Israel</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">Market Success</div>
                      <div className="text-sm text-green-100">Successful market entry and user acquisition</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">Regional Recognition</div>
                      <div className="text-sm text-green-100">One of Spotify's most successful regional launches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">Community Building</div>
                      <div className="text-sm text-green-100">Established strong local user base</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Tourism Case Study - Slide 1: Logo → Subtitle → Image
function TourismIntroSlide() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative"
      style={{ backgroundColor: "#1a1a2e" }}
    >
      <CreativeBurst className="top-0 left-0 opacity-20" size="medium" />
      <CreativeBurst className="bottom-0 right-0 opacity-25" size="large" />

      <div className="max-w-4xl md:max-w-6xl mx-auto text-center relative z-10 space-y-4 md:space-y-6">
        {/* 1. Transparent Logo */}
        <div className="mb-3 md:mb-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_qrPR982XbOxjVlzYFdBlECpSvORA/TqWKwa4rDmo8S3LLcjNzDV/public/israeli-ministry-tourism-logo.png"
            alt="Israeli Ministry of Tourism"
            className="mx-auto max-w-2xl md:max-w-3xl w-full drop-shadow-2xl"
          />
        </div>

        {/* 2. Subtitle */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-3 md:p-5 shadow-2xl">
          <p className="text-sm md:text-lg text-purple-900 font-medium">
            Multy-Platform European Campaign Driving Record Tourism Growth
          </p>
        </div>

        {/* 3. Image in Original Position */}
        <div className="w-full max-w-3xl md:max-w-4xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-white">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_qrPR982XbOxjVlzYFdBlECpSvORA/vPo1Fv8rvlSt5IF8OsKpqf/public/tourist-campaign.jpg"
            alt="Tourism Campaign Visual"
            className="w-full h-56 md:h-80 object-cover"
          />
        </div>
      </div>
    </div>
  )
}

// Tourism Case Study - Slide 2: Mobile-First Design
function TourismDetailSlide() {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ backgroundColor: "#1a1a2e" }}>
      <div className="absolute inset-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_qrPR982XbOxjVlzYFdBlECpSvORA/vPo1Fv8rvlSt5IF8OsKpqf/public/tourist-campaign.jpg"
          alt="Tourism Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <CreativeBurst className="top-10 right-10 opacity-30" size="medium" />
      <CreativeBurst className="bottom-10 left-10 opacity-25" size="small" />

      {/* Mobile Layout */}
      <div className="md:hidden relative z-10 h-full p-4 overflow-y-auto pb-20">
        <div className="space-y-4">
          {/* Header Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl text-center">
            <h2 className="text-xl font-black text-purple-900 mb-2">MINISTRY OF TOURISM</h2>
            <div className="inline-block bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 rounded-full text-xs font-bold">
              My Role: Creative Strategist
            </div>
          </div>

          {/* Insight Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-l-4 border-orange-400">
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Strategic Insight
            </h3>
            <p className="text-sm text-purple-800 leading-relaxed">
              Europeans seek urban city breaks over traditional tourism. Positioned Tel Aviv and Jerusalem as perfect
              short-break destinations.
            </p>
          </div>

          {/* Strategy Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-l-4 border-red-400">
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
              Creative Strategy
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-red-500 text-sm">•</span>
                <span className="text-sm text-purple-800">Multi-platform social amplifying TV content</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 text-sm">•</span>
                <span className="text-sm text-purple-800">Weather personalities + lifestyle creators</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 text-sm">•</span>
                <span className="text-sm text-purple-800">Cross-platform urban experience showcase</span>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-4 text-white shadow-xl">
            <h3 className="text-lg font-bold mb-3 text-center">Results</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">38% Increase</div>
                <div className="text-xs text-orange-100 mt-1">Tourists visiting Israel</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">91% Tel Aviv, 49% Jerusalem</div>
                <div className="text-xs text-orange-100 mt-1">Hostel bookings</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">13.5M Engaged Clicks</div>
                <div className="text-xs text-orange-100 mt-1">1+ minute engagement</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">Record Tourism</div>
                <div className="text-xs text-orange-100 mt-1">Breaking monthly arrivals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (unchanged) */}
      <div className="hidden md:block relative z-10 h-full p-8 overflow-y-auto pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-2xl">
            <h2 className="text-3xl font-black mb-3 leading-none tracking-tight text-purple-900">
              ISRAELI MINISTRY OF TOURISM
            </h2>
            <h3 className="text-lg text-purple-700 mb-3 leading-tight font-medium">
              Multy-Platform European Campaign Driving Record Tourism Growth
            </h3>
            <div className="inline-block bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-2 rounded-full text-sm font-bold">
              My Role: Creative Strategist
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-purple-900 mb-3">Strategic Insight</h4>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Europeans increasingly seek urban city breaks over traditional country tourism. Positioned Tel
                        Aviv and Jerusalem as perfect short-break destinations combining culture, nightlife, and
                        year-round sunshine.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-purple-900 mb-3">Creative Strategy</h4>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Multi-faceted integrated campaign amplifying TV content across digital platforms
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Cross-platform strategy showcasing both ideal weather and rich urban experiences - from beaches
                        to nightlife to cultural activities
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Influencer collaboration strategy with weather personalities, lifestyle creators, and local
                        cultural figures
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">→</span>
                      <span className="text-purple-800">Platform-native content adaptation for maximum engagement</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-purple-900 mb-3">Campaign Architecture</h4>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Prime-time television campaigns across major networks (Germany, Britain, Russia, Italy)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Cross-platform amplification driving traffic to dedicated landing pages
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Targeted online advertising and social content showcasing urban
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-6 text-white">
                  <h4 className="text-xl font-bold mb-4">Results</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">38% Increase</div>
                      <div className="text-sm text-orange-100">Tourists visiting Israel post-campaign</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">91% Tel Aviv, 49% Jerusalem</div>
                      <div className="text-sm text-orange-100">Increase in hostel bookings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">13.5M Engaged Clicks</div>
                      <div className="text-sm text-orange-100">To landing pages with 1+ minute engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">Record Tourism</div>
                      <div className="text-sm text-orange-100">Breaking arrival numbers monthly</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Maccabee Case Study - Slide 1: Logo → Subtitle → Image
function MaccabeeIntroSlide() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative"
      style={{ backgroundColor: "#1a1a2e" }}
    >
      <CreativeBurst className="top-0 right-0 opacity-20" size="medium" />
      <CreativeBurst className="bottom-0 left-0 opacity-25" size="large" />

      <div className="max-w-4xl md:max-w-6xl mx-auto text-center relative z-10 space-y-4 md:space-y-6">
        {/* 1. Transparent Logo */}
        <div className="mb-3 md:mb-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_qrPR982XbOxjVlzYFdBlECpSvORA/lYHT0ZRvBqM4k18nFXoa6b/public/maccabee-beer-logo.png"
            alt="Maccabee Beer"
            className="mx-auto max-w-3xl md:max-w-4xl w-full drop-shadow-2xl"
          />
        </div>

        {/* 2. Subtitle */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-3 md:p-5 shadow-2xl">
          <p className="text-sm md:text-lg text-purple-900 font-medium">
            Brand Transformation Through Creator Partnerships
          </p>
        </div>

        {/* 3. Image in Original Position */}
        <div className="w-full max-w-3xl md:max-w-4xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-white">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_qrPR982XbOxjVlzYFdBlECpSvORA/8RFHev7NEQq2QjP662axKc/public/maccabee-campaign.jpg"
            alt="Maccabee Campaign Visual"
            className="w-full h-56 md:h-80 object-cover"
          />
        </div>
      </div>
    </div>
  )
}

// Maccabee Case Study - Slide 2: Mobile-First Design
function MaccabeeDetailSlide() {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ backgroundColor: "#1a1a2e" }}>
      <div className="absolute inset-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_qrPR982XbOxjVlzYFdBlECpSvORA/8RFHev7NEQq2QjP662axKc/public/maccabee-campaign.jpg"
          alt="Maccabee Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <CreativeBurst className="top-10 left-10 opacity-30" size="medium" />
      <CreativeBurst className="bottom-10 right-10 opacity-25" size="small" />

      {/* Mobile Layout */}
      <div className="md:hidden relative z-10 h-full p-4 overflow-y-auto pb-20">
        <div className="space-y-4">
          {/* Header Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl text-center">
            <h2 className="text-2xl font-black text-purple-900 mb-2">MACCABEE BEER</h2>
            <div className="inline-block bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold">
              My Role: Brand Transformation Strategist
            </div>
          </div>

          {/* Challenge Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-l-4 border-amber-400">
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
              The Challenge
            </h3>
            <p className="text-sm text-purple-800 leading-relaxed">
              Transform failing beer brand into Tel Aviv's coolest beverage choice through strategic repositioning.
            </p>
          </div>

          {/* Strategy Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-l-4 border-orange-400">
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Creative Strategy
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-orange-500 text-sm">•</span>
                <span className="text-sm text-purple-800">Leveraged underdog status as competitive advantage</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500 text-sm">•</span>
                <span className="text-sm text-purple-800">Targeted hipster community through cultural integration</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500 text-sm">•</span>
                <span className="text-sm text-purple-800">Created sustained creator collaboration ecosystem</span>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl p-4 text-white shadow-xl">
            <h3 className="text-lg font-bold mb-3 text-center">Results</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">#2 Most Watched</div>
                <div className="text-xs text-amber-100 mt-1">YouTube IL</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">Cultural Icon</div>
                <div className="text-xs text-amber-100 mt-1">"Coolest beer in TLV"</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">Market Leader</div>
                <div className="text-xs text-amber-100 mt-1">Most popular in bars</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3">
                <div className="text-sm font-bold text-yellow-300">Sustained Success</div>
                <div className="text-xs text-amber-100 mt-1">Ongoing partnerships</div>
              </div>
            </div>
          </div>
        </div>
        {/* end space-y-4 */}
      </div>
      {/* end md:hidden */}

      {/* Desktop Layout (unchanged) */}
      <div className="hidden md:block relative z-10 h-full p-8 overflow-y-auto pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-2xl">
            <h2 className="text-3xl font-black mb-3 leading-none tracking-tight text-purple-900">MACCABEE BEER</h2>
            <h3 className="text-lg text-purple-700 mb-3 leading-tight font-medium">
              Brand Transformation Through Creator Partnerships
            </h3>
            <div className="inline-block bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold">
              My Role: Brand Transformation Strategist
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-purple-900 mb-3">The Challenge</h4>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">→</span>
                      <span className="text-purple-800">
                        Transform failing beer brand into Tel Aviv's coolest beverage choice through strategic
                        repositioning
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-purple-900 mb-3">Creative Strategy</h4>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">→</span>
                      <span className="text-purple-800">Leveraged underdog status as competitive advantage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">→</span>
                      <span className="text-purple-800">Targeted hipster community through cultural integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">→</span>
                      <span className="text-purple-800">Created sustained creator collaboration ecosystem</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-purple-900 mb-3">Campaign Execution</h4>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold">→</span>
                      <span className="text-purple-800">Strategic partnerships with local Tel Aviv creators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold">→</span>
                      <span className="text-purple-800">Authentic content integration within Tel Aviv nightlife</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-6 text-white">
                  <h4 className="text-xl font-bold mb-4">Results</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">#2 Most Watched</div>
                      <div className="text-sm text-amber-100">YouTube Israel</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">Cultural Icon</div>
                      <div className="text-sm text-amber-100">"Coolest beer in TLV"</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">Market Leader</div>
                      <div className="text-sm text-amber-100">Most popular in bars</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-300 mb-1">Sustained Success</div>
                      <div className="text-sm text-amber-100">Ongoing partnerships</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CapabilitiesSlide() {
  return (
    <div className="w-full h-full p-4 md:p-8 overflow-hidden relative" style={{ backgroundColor: "#1a1a2e" }}>
      {/* Decorative bursts */}
      <CreativeBurst className="top-0 left-0 opacity-20" size="large" />
      <CreativeBurst className="top-0 right-0 opacity-20" size="medium" />
      <CreativeBurst className="bottom-0 left-0 opacity-25" size="medium" />
      <CreativeBurst className="bottom-0 right-0 opacity-25" size="large" />

      <div className="max-w-7xl mx-auto h-full flex flex-col relative z-10 pb-20 md:pb-24">
        {/* Larger title for mobile */}
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-black text-white mb-2 md:mb-6 tracking-tight">
            STRATEGIC CAPABILITIES
          </h1>
        </div>

        {/* Mobile: Single column with proper spacing, Desktop: Two columns */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 max-h-full">
            {/* LEFT column */}
            <div className="flex flex-col gap-3 md:gap-6">
              <CapabilityCard
                color="pink"
                title="Strategic Creative Leadership"
                bullets={[
                  "Develop creative strategies for global brands and startups",
                  "Transform complex positioning challenges into clear creative direction",
                  "Lead strategic thinking across diverse client contexts",
                ]}
              />

              <CapabilityCard
                color="cyan"
                title="Cultural Trend Intelligence"
                bullets={[
                  "Identify emerging cultural moments and translate them into brand opportunities",
                  "Understand where culture is heading before it becomes mainstream",
                  "Connect authentic cultural insights to strategic creative work",
                ]}
              />
            </div>

            {/* RIGHT column */}
            <div className="flex flex-col gap-3 md:gap-6">
              <CapabilityCard
                color="yellow"
                title="AI-Enhanced Innovation"
                bullets={[
                  "AI-first strategic creative development",
                  "Rapid concept prototyping & creative exploration",
                  "Emerging tech integration in creative strategy",
                ]}
              />

              <CapabilityCard
                color="purple"
                title="Cross-Functional Coordination"
                bullets={[
                  "Lead multidisciplinary teams including designers, developers, and strategists",
                  "Coordinate complex creative projects across different skill sets",
                  "Bridge strategic thinking with creative execution",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Helper card component */
function CapabilityCard({
  color,
  title,
  bullets,
}: {
  color: "pink" | "cyan" | "yellow" | "purple"
  title: string
  bullets: string[]
}) {
  const colors: Record<typeof color, string> = {
    pink: "pink-400",
    cyan: "cyan-400",
    yellow: "yellow-400",
    purple: "purple-400",
  } as const

  return (
    <div
      className={`bg-white/95 backdrop-blur-sm rounded-xl md:rounded-3xl p-3 md:p-5 shadow-2xl border-l-4 md:border-l-8 border-${colors[color]} min-h-0`}
    >
      <div className="flex items-center mb-2 md:mb-3">
        <div className={`w-2 h-2 md:w-4 md:h-4 bg-${colors[color]} rounded-full mr-2 md:mr-3 flex-shrink-0`} />
        <h3 className="text-sm md:text-lg font-bold text-purple-900 leading-tight">{title}</h3>
      </div>

      <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-purple-800">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className={`text-${colors[color].replace("-400", "")}-500 mt-0.5 text-xs md:text-base flex-shrink-0`}>
              •
            </span>
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ThankYouSlide() {
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#1a1a2e" }}
    >
      {/* Creative burst elements */}
      <CreativeBurst className="top-10 left-10 opacity-40" size="large" />
      <CreativeBurst className="top-10 right-10 opacity-35" size="medium" />
      <CreativeBurst className="bottom-10 left-10 opacity-30" size="medium" />
      <CreativeBurst className="bottom-10 right-10 opacity-45" size="large" />

      <div className="text-center z-10 relative px-4 w-full h-full flex items-center justify-center">
        {/* Container for the thank you image and overlay */}
        <div className="relative">
          {/* New Transparent Thank You Image */}
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freepik__background__5916-c2slE0ErCLQ43xm3wA9r02ZXV1HHD8.png"
            alt="Thank You"
            className="max-w-4xl md:max-w-6xl w-full drop-shadow-2xl"
          />

          {/* Enhanced Contact Details Overlay */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl max-w-sm md:max-w-lg border border-white/30">
            <div className="space-y-3 md:space-y-4">
              <a
                href="mailto:etay@etaynaor.com"
                className="block text-purple-900 text-lg md:text-xl font-semibold hover:text-purple-700 transition-colors duration-200 hover:underline"
              >
                etay@etaynaor.com
              </a>

              <div className="text-purple-900 text-lg md:text-xl font-semibold">+49&nbsp;176&nbsp;301&nbsp;82021</div>

              <div className="text-purple-900 text-lg md:text-xl font-semibold flex items-center justify-center gap-2">
                <span className="text-purple-600">📍</span>
                Berlin, Germany
              </div>

              <div className="pt-2 border-t border-purple-200">
                <div className="text-purple-700 text-base md:text-lg italic font-medium">
                  Looking forward to hearing from you!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
