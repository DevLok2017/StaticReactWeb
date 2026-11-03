import { z } from 'zod'

const imagePath = z.string().min(1)

const familyMemberSchema = z.object({
  name: z.string(),
  relation: z.string().optional(),
})

const familySchema = z.object({
  surname: z.string().optional(),
  photo: imagePath.optional(),
  parents: z.array(familyMemberSchema).default([]),
  grandparents: z.array(familyMemberSchema).default([]),
  siblings: z.array(familyMemberSchema).default([]),
})

const profileSchema = z.object({
  name: z.string(),
  photo: imagePath.optional(),
  intro: z.string().optional(),
  culturalBackground: z.string().optional(),
  traits: z.array(z.string()).default([]),
  hobbies: z.array(z.string()).default([]),
})

const storyChapterSchema = z.object({
  number: z.number(),
  title: z.string(),
  description: z.string(),
  date: z.string().optional(),
  image: imagePath.optional(),
})

const storybookPageSchema = z.object({
  title: z.string().optional(),
  text: z.string(),
  image: imagePath.optional(),
})

const childhoodMemorySchema = z.object({
  photo: imagePath,
  caption: z.string().optional(),
  owner: z.enum(['bride', 'groom']).optional(),
})

const ceremonySchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string().optional(),
  description: z.string().optional(),
  image: imagePath.optional(),
  venue: z.string().optional(),
  dressCode: z.string().optional(),
  instructions: z.string().optional(),
})

const venueSchema = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string().optional(),
  country: z.string().optional(),
  photo: imagePath.optional(),
  mapImage: imagePath.optional(),
  mapsUrl: z.string().url().optional(),
})

const galleryImageSchema = z.object({
  src: imagePath,
  thumb: imagePath.optional(),
  caption: z.string().optional(),
  category: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
})

const contactSchema = z.object({
  name: z.string(),
  relationship: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  photo: imagePath.optional(),
})

export const weddingSchema = z.object({
  coupleNames: z.object({
    bride: z.string(),
    groom: z.string(),
  }),
  weddingDate: z.string(),
  timezone: z.string().default('Asia/Kolkata'),
  blessing: z.string().optional(),
  heroTagline: z.string().optional(),
  heroImage: imagePath.optional(),
  monogram: z.string().optional(),
  family: z.object({
    bride: familySchema,
    groom: familySchema,
  }),
  profiles: z.object({
    bride: profileSchema,
    groom: profileSchema,
  }),
  loveStory: z.array(storyChapterSchema).default([]),
  storybook: z.array(storybookPageSchema).default([]),
  childhoodMemories: z.array(childhoodMemorySchema).default([]),
  ceremonies: z.object({
    bride: z.array(ceremonySchema).default([]),
    groom: z.array(ceremonySchema).default([]),
  }),
  venue: venueSchema,
  gallery: z.array(galleryImageSchema).default([]),
  rsvp: z.object({
    bride: z.array(contactSchema).default([]),
    groom: z.array(contactSchema).default([]),
  }),
  closingMessage: z.string().optional(),
  music: z
    .object({
      src: z.string(),
      title: z.string().optional(),
    })
    .optional(),
  social: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      previewImage: imagePath.optional(),
    })
    .optional(),
})

export type WeddingConfig = z.infer<typeof weddingSchema>
