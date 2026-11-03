import { z } from 'zod'

export const sectionTypeSchema = z.enum([
  'invitation',
  'hero',
  'family',
  'couple',
  'loveStory',
  'storybook',
  'memories',
  'countdown',
  'ceremonies',
  'venue',
  'gallery',
  'rsvp',
  'closing',
])

export const sectionSchema = z.object({
  id: z.string(),
  type: sectionTypeSchema,
  enabled: z.boolean().default(true),
  order: z.number(),
  settings: z.record(z.string(), z.unknown()).optional(),
})

export const sectionsFileSchema = z.object({
  sections: z.array(sectionSchema),
})

export type SectionType = z.infer<typeof sectionTypeSchema>
export type SectionConfig = z.infer<typeof sectionSchema>
export type SectionsFile = z.infer<typeof sectionsFileSchema>
