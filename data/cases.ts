export type CaseStudy = {
  id: string
  client: string
  role: string
  logo: string
  cover: string
  subtitle: string
  summary: string
  challenge?: string
  strategy?: string[]
  results?: string[]
  featured?: boolean
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "sodastream",
    client: "SodaStream",
    role: "Creative Strategist",
    logo: "/sodastream-logo.png",
    cover: "/sodastream-campaign.jpg",
    subtitle: '"Shame or Glory" — helped drive premium repositioning',
    summary:
      "Repositioned SodaStream from utility to premium environmental lifestyle through bold, social-first creative.",
    challenge:
      "Transform perception from budget soda maker to premium brand with cultural relevance and viral reach.",
    strategy: [
      "Content-first creative with unapologetic anti-plastic stance",
      "Smart casting and platform-native distribution",
      "Integrated architecture across channels",
    ],
    results: [
      "Cultural impact and viral success",
      "Contributed to $2.3B PepsiCo acquisition",
      "Award-winning, elevated brand perception",
    ],
    featured: true,
  },
  {
    id: "spotify",
    client: "Spotify",
    role: "Lead Strategic Architect",
    logo: "/spotify-logo.png",
    cover: "/spotify-campaign.jpg",
    subtitle: "Creator-first market entry in Israel",
    summary:
      "Launched with authentic music community integration and platform-specific creative to amplify culture.",
    challenge:
      "Enter a unique local market with an authentic, creator-led approach that resonates culturally.",
    strategy: [
      "Creator-first launch with top Israeli musicians",
      "Platform-specific social amplification",
      "Integrated video, OOH, and digital",
    ],
    results: [
      "Exceeded subscriber targets",
      "Successful market entry and user growth",
      "Recognized as a standout regional launch",
    ],
    featured: true,
  },
  {
    id: "tourism",
    client: "Israeli Ministry of Tourism",
    role: "Creative Strategist",
    logo: "/israeli-ministry-tourism-logo.png",
    cover: "/tourist-campaign.jpg",
    subtitle: "Multi-platform European campaign",
    summary:
      "Positioned Tel Aviv and Jerusalem as ideal city-breaks with cross-platform amplification and creators.",
    challenge:
      "Shift perception toward urban short-break destinations and drive record tourism.",
    strategy: [
      "Amplified TV content across digital",
      "Weather personalities + lifestyle creators",
      "Cross-platform urban experience storytelling",
    ],
    results: [
      "Significant tourist growth and engagement",
      "Record arrivals and bookings",
    ],
    featured: true,
  },
  {
    id: "maccabee",
    client: "Maccabee Beer",
    role: "Brand Transformation Strategist",
    logo: "/maccabee-beer-logo.png",
    cover: "/maccabee-campaign.jpg",
    subtitle: "Creator partnerships to rebuild brand cool",
    summary:
      "Leveraged underdog positioning and sustained creator collaborations to win cultural relevance.",
    challenge:
      "Rebuild a declining brand into Tel Aviv’s go-to choice through culture-first strategy.",
    strategy: [
      "Underdog-as-advantage repositioning",
      "Deep integration with local scenes",
      "Sustained creator collaboration ecosystem",
    ],
    results: [
      "Became cultural staple in TLV",
      "Category leadership in bars",
    ],
  },
]


