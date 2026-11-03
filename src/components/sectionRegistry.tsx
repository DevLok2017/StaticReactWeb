import { lazy, type ComponentType } from 'react'
import type { SectionType } from '../schemas/sections'
import { HeroSection } from './hero/HeroSection'

const FamilySection = lazy(() =>
  import('./family/FamilySection').then((m) => ({ default: m.FamilySection })),
)
const CoupleSection = lazy(() =>
  import('./couple/CoupleSection').then((m) => ({ default: m.CoupleSection })),
)
const LoveStorySection = lazy(() =>
  import('./love-story/LoveStorySection').then((m) => ({ default: m.LoveStorySection })),
)
const InteractiveStorybook = lazy(() =>
  import('./storybook/InteractiveStorybook').then((m) => ({ default: m.InteractiveStorybook })),
)
const ChildhoodMemories = lazy(() =>
  import('./memories/ChildhoodMemories').then((m) => ({ default: m.ChildhoodMemories })),
)
const CountdownSection = lazy(() =>
  import('./countdown/CountdownSection').then((m) => ({ default: m.CountdownSection })),
)
const CeremonySection = lazy(() =>
  import('./ceremonies/CeremonySection').then((m) => ({ default: m.CeremonySection })),
)
const VenueSection = lazy(() =>
  import('./venue/VenueSection').then((m) => ({ default: m.VenueSection })),
)
const PhotoGallery = lazy(() =>
  import('./gallery/PhotoGallery').then((m) => ({ default: m.PhotoGallery })),
)
const RSVPSection = lazy(() =>
  import('./rsvp/RSVPSection').then((m) => ({ default: m.RSVPSection })),
)
const ClosingSection = lazy(() =>
  import('./footer/ClosingSection').then((m) => ({ default: m.ClosingSection })),
)

// 'invitation' is handled separately by InvitationCover (overlay, not an in-flow section).
// Only 'hero' is eager — it's the first section visible once the invitation opens;
// everything below the fold is code-split to keep the initial bundle small.
export const sectionRegistry: Partial<Record<SectionType, ComponentType>> = {
  hero: HeroSection,
  family: FamilySection,
  couple: CoupleSection,
  loveStory: LoveStorySection,
  storybook: InteractiveStorybook,
  memories: ChildhoodMemories,
  countdown: CountdownSection,
  ceremonies: CeremonySection,
  venue: VenueSection,
  gallery: PhotoGallery,
  rsvp: RSVPSection,
  closing: ClosingSection,
}
