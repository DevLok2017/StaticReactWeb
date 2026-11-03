import type { WeddingConfig } from '../schemas/wedding'
import type { ThemesFile } from '../schemas/theme'
import type { SectionsFile } from '../schemas/sections'
import type { AnimationsConfig } from '../schemas/animations'

export const DEFAULT_WEDDING: WeddingConfig = {
  coupleNames: { bride: 'Ananya', groom: 'Rohan' },
  weddingDate: '2027-02-14T10:00:00+05:30',
  timezone: 'Asia/Kolkata',
  blessing: 'ॐ Shree Ganeshaya Namah',
  heroTagline: 'Two hearts, one journey',
  monogram: 'A & R',
  family: {
    bride: { parents: [], grandparents: [], siblings: [] },
    groom: { parents: [], grandparents: [], siblings: [] },
  },
  profiles: {
    bride: { name: 'Ananya', traits: [], hobbies: [] },
    groom: { name: 'Rohan', traits: [], hobbies: [] },
  },
  loveStory: [],
  storybook: [],
  childhoodMemories: [],
  ceremonies: { bride: [], groom: [] },
  venue: { name: 'Venue TBA', address: '', city: '' },
  gallery: [],
  rsvp: { bride: [], groom: [] },
}

export const DEFAULT_THEMES: ThemesFile = {
  activeTheme: 'royal-indian',
  themes: [
    {
      name: 'royal-indian',
      colors: {
        primary: '#7a1f2b',
        secondary: '#2f2a1f',
        accent: '#c9a24b',
        background: '#fdf6ec',
        backgroundAlt: '#f6ead3',
        text: '#2b2118',
        textMuted: '#6b5d4e',
        gold: '#c9a24b',
        jewel: '#2f6f66',
      },
      fonts: {
        heading: "'Cormorant Garamond', serif",
        script: "'Great Vibes', cursive",
        body: "'Mulish', sans-serif",
      },
      radius: { sm: '0.5rem', md: '1rem', lg: '2rem' },
      shadow: {
        soft: '0 4px 20px rgba(43,33,24,0.08)',
        strong: '0 10px 40px rgba(43,33,24,0.18)',
      },
    },
  ],
}

export const DEFAULT_SECTIONS: SectionsFile = {
  sections: [
    { id: 'opening', type: 'invitation', enabled: true, order: 1 },
    { id: 'hero', type: 'hero', enabled: true, order: 2 },
    { id: 'family', type: 'family', enabled: true, order: 3 },
    { id: 'couple', type: 'couple', enabled: true, order: 4 },
    { id: 'loveStory', type: 'loveStory', enabled: true, order: 5 },
    { id: 'storybook', type: 'storybook', enabled: true, order: 6 },
    { id: 'memories', type: 'memories', enabled: true, order: 7 },
    { id: 'countdown', type: 'countdown', enabled: true, order: 8 },
    { id: 'ceremonies', type: 'ceremonies', enabled: true, order: 9 },
    { id: 'venue', type: 'venue', enabled: true, order: 10 },
    { id: 'gallery', type: 'gallery', enabled: true, order: 11 },
    { id: 'rsvp', type: 'rsvp', enabled: true, order: 12 },
    { id: 'closing', type: 'closing', enabled: true, order: 13 },
  ],
}

export const DEFAULT_ANIMATIONS: AnimationsConfig = {
  enabled: true,
  scrollReveal: { duration: 0.6, delay: 0.1, easing: [0.22, 1, 0.36, 1], distance: 24 },
  pageTransition: { duration: 0.8 },
  floating: { enabled: true, duration: 4 },
  reducedMotion: { disableFloating: true, disableParallax: true },
}
