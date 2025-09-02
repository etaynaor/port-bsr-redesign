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
      'Strategic repositioning from utilitarian soda maker to premium environmental lifestyle brand; social-first, celebrity amplified.',
    problem:
      'Transform brand perception and growth via social media strategy and clear repositioning toward sustainability.',
    approach: [
      'Repositioned brand as a premium sparkling-water environmental champion',
      'Social-first content strategy with bold “F*ck Plastic Bottles” messaging',
      'Smart casting: leveraged Game of Thrones popularity for amplification',
      'Platform‑native creative across channels to maximize viral potential',
      'Integrated campaign architecture across multiple touchpoints',
      'Campaign elements: award‑winning “Shame or Glory” viral video, celebrity spokesperson, Paris Hilton collaborations'
    ],
    outcome: [
      'Viral success: “Shame or Glory” achieved massive reach',
      '$2.3B acquisition: repositioning contributed to PepsiCo acquisition',
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
      'Creator‑first launch for Israel: authentic musician partnerships, platform‑specific content, integrated OOH/digital.',
    problem:
      'Launch Spotify in Israel with local cultural challenges requiring authentic community integration.',
    approach: [
      'Creator‑first strategy featuring leading Israeli musicians',
      'Platform‑specific content designed for social amplification',
      'Integrated campaign across video, OOH, and digital media',
      'Authentic partnerships with the local music community'
    ],
    outcome: [
      '200% target achievement: doubled subscriber targets for Israel',
      'Successful market entry and user acquisition',
      'Regional recognition as one of Spotify’s most successful launches',
      'Community building: strong local user base'
    ],
    artifacts: [
      { alt: 'Spotify campaign', src: '/spotify-campaign.jpg' }
    ]
  },
  {
    id: 'tourism',
    title: 'Israeli Ministry of Tourism',
    role: 'Creative Strategist',
    summary:
      'Multi‑platform European campaign: TV + social amplification positioning Tel Aviv and Jerusalem as short‑break destinations.',
    problem:
      'Fragmented messaging; needed to align to urban city‑break demand across Europe and drive measurable tourism intent.',
    approach: [
      'Amplified TV with platform‑native social content',
      'Showcased weather, nightlife, beach, and culture in an urban frame',
      'Influencer collaborations with weather, lifestyle, and local cultural figures',
      'Country‑specific adaptations with consistent core story',
      'Prime‑time TV in Germany, Britain, Russia, Italy; social to landing pages'
    ],
    outcome: [
      '38% increase in tourists post‑campaign',
      'Hostel bookings up: 91% Tel Aviv, 49% Jerusalem',
      '13.5M engaged clicks to landing pages (1+ minute)',
      'Record‑breaking monthly arrivals'
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
      'Social‑led repositioning via creator partnerships; integrated into Tel Aviv’s nightlife and culture.',
    problem:
      'Transform a failing beer brand into Tel Aviv’s coolest choice.',
    approach: [
      'Leveraged underdog status as a competitive advantage',
      'Targeted hipster community via cultural integration',
      'Built a sustained creator collaboration ecosystem',
      'Strategic partnerships embedded in nightlife venues'
    ],
    outcome: [
      '#2 most‑watched on YouTube Israel',
      'Cultural icon: “Coolest beer in TLV”',
      'Most popular pour in bars',
      'Sustained success via ongoing partnerships'
    ],
    artifacts: [
      { alt: 'Maccabee campaign', src: '/maccabee-campaign.jpg' }
    ]
  },
  // Additional case studies can be added here as needed.
]
