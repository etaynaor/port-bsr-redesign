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
      `Helped reposition the brand as a premium sparkling-water brand with an anti-plastic stance and viral celebrity campaigns, fueling renewed relevance ahead of PepsiCo’s US $3.2 B acquisition.`,
    problem:
      'Reposition a stagnant brand toward premium environmental consciousness.',
    approach: [
      'Reframed the product from budget home carbonation to lifestyle choice with anti-plastic messaging',
      'Leveraged social platforms with bold messaging',
      'Cast recognizable talent for broader appeal',
      'Designed formats for social distribution',
      'Integrated campaign architecture across touchpoints'
    ],
    outcome: [
      'Viral campaign success',
      'Contributed to PepsiCo\'s $3.2B acquisition',
      'Award recognition',
      'Brand elevation from utility to premium status'
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
      'Launched the streaming service in Israel through creator-centric partnerships and localized content. Achieved approximately double the subscriber targets and ranked among the company\'s strongest market launches.',
    problem:
      'Launch Spotify in Israel with authentic community integration.',
    approach: [
      'Partnered with local musicians',
      'Designed formats for social distribution',
      'Coordinated integrated rollout across video, outdoor advertising, and digital channels',
      'Built deep partnerships with the local music community'
    ],
    outcome: [
      '~200% target achievement',
      'Ranked among strongest market launches',
      'Strong community adoption'
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
      'Repositioned tourism marketing toward young European travelers, emphasizing Tel Aviv and Jerusalem as city-break destinations rather than national branding.',
    problem:
      'Reset Israel\'s tourism pitch for young European travelers.',
    approach: [
      'Emphasized Tel Aviv and Jerusalem as city-break destinations',
      'Moved away from national branding toward specific city experiences',
      'Created integrated campaign across TV and social platforms',
      'Designed localized content for different markets'
    ],
    outcome: [
      'Tourist arrivals increased ~38%',
      'Hostel bookings rose significantly (Tel Aviv ~91%, Jerusalem ~49%)',
      'Generated ~13.5M engaged clicks'
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
      'Repositioned a legacy brand as Tel Aviv\'s preferred choice through sustained creator partnerships and venue integration.',
    problem:
      'Transform a legacy brand to become Tel Aviv\'s preferred choice.',
    approach: [
      'Built sustained creator partnerships',
      'Integrated directly with venues and nightlife',
      'Developed social-first content strategy',
      'Leveraged authentic local connections'
    ],
    outcome: [
      'Achieved #2 most-watched YouTube video in Israel that year',
      'Established perception as the city\'s coolest beer brand',
      'Strong presence across Tel Aviv venues'
    ],
    artifacts: [
      { alt: 'Maccabee campaign', src: '/maccabee-campaign.jpg' }
    ]
  },
  // Additional case studies can be added here as needed.
]
