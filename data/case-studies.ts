export type CaseStudy = {
  id: string
  title: string
  role: string
  summary: string
  problem: string
  approach: string[]
  outcome: string[]
  artifacts?: { alt: string; src: string }[]
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'sodastream',
    title: 'SodaStream',
    role: 'Creative Strategist & Campaign Development',
    summary:
      'Strategic repositioning to a premium environmental lifestyle brand; social-first, celebrity-amplified — contributed to $2.3B PepsiCo acquisition.',
    problem:
      'Elevate a stagnating brand.',
    approach: [
      'Reframe from “cheap cola at home” to premium sparkling‑water lifestyle with a clear anti‑plastic stance.',
      'Social‑first content with bold anti‑plastic messaging (e.g., “F*ck Plastic Bottles”)',
      'Smart casting (incl. Game of Thrones talent) to extend reach',
      'Channel‑specific creative and cutdowns',
      'Integrated campaign architecture across touchpoints',
      'Campaign elements: “Shame or Glory” film, celebrity work (incl. Paris Hilton), creator distribution'
    ],
    outcome: [
      '“Shame or Glory” went viral with broad reach',
      'Contributed to PepsiCo’s $2.3B acquisition',
      'Award‑winning campaign recognition',
      'Brand elevation: utility → premium lifestyle'
    ],
    artifacts: [
      { alt: 'SodaStream campaign', src: '/sodastream-campaign.jpg' }
    ]
  },
  {
    id: 'spotify',
    title: 'Spotify',
    role: 'Lead Strategic Architect for Market Entry',
    summary:
      'Creator‑first launch with local musicians and channel‑specific content; hit ~200% of subscriber targets and ranked among Spotify’s best‑performing markets.',
    problem:
      'Launch Spotify in Israel with authentic community integration and creator partnerships; coordinate channel‑specific content with OOH.',
    approach: [
      'Creator‑first strategy with leading Israeli musicians',
      'Formats designed to travel on social; disciplined channel edits',
      'Integrated rollout across video, OOH, and digital',
      'Deep partnerships with the local music community'
    ],
    outcome: [
      '~200% target achievement in the launch window',
      'Recognized internally as one of the stronger market launches',
      'Strong local community and early adoption'
    ],
    artifacts: [
      { alt: 'Spotify campaign', src: '/spotify-campaign.jpg' }
    ]
  },
  {
    id: 'tourism',
    title: 'Israeli Ministry of Tourism',
    role: 'Creative Strategist & Campaign Development',
    summary:
      'City‑break reframing for Tel Aviv and Jerusalem (TV + social). Tourists up ~38%; hostel bookings up (Tel Aviv ~91%, Jerusalem ~49%).',
    problem:
      'Reset Israel’s tourism pitch for young EU travelers.',
    approach: [
      'Ditch nation‑brand ads. Market Tel Aviv + Jerusalem together as a sunny city‑break for young travelers',
      'One core campaign with per‑market versions. Sell two specific city breaks: Tel Aviv (sun/nightlife) & Jerusalem (culture/history).',
      'Prime‑time TV to set the frame; social edits for daily reach',
      'Weather‑led and vibe‑led cutdowns that show real city rhythm',
      'Creator integrations and city‑specific landing flows'
    ],
    outcome: [
      'Tourists up ~38% post‑campaign',
      'Hostel bookings up (Tel Aviv ~91%, Jerusalem ~49%)',
      '~13.5M engaged clicks'
    ],
    artifacts: [
      { alt: 'Tourism campaign', src: '/tourist-campaign.jpg' }
    ]
  },
  {
    id: 'maccabee',
    title: 'Maccabee Beer',
    role: 'Brand Transformation Strategist',
    summary:
      'Social‑led repositioning via creator partnerships; re‑embedded in Tel Aviv’s nightlife and culture.',
    problem:
      'Transform a legacy label into Tel Aviv’s coolest choice.',
    approach: [
      'Leverage underdog status as an advantage',
      'Build a sustained creator‑collaboration ecosystem',
      'Partner directly with venues; keep it present in bars and nights',
      'Support with tight social films and recurring content formats'
    ],
    outcome: [
      '#2 most‑watched YouTube video in Israel that year',
      'Widely perceived as “coolest beer in TLV”',
      'Strong, sustained presence on taps and in venues'
    ],
    artifacts: [
      { alt: 'Maccabee campaign', src: '/maccabee-campaign.jpg' }
    ]
  },
  // Additional case studies can be added here as needed.
]
