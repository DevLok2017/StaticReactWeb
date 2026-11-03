import { z } from 'zod'

export const animationsSchema = z.object({
  enabled: z.boolean().default(true),
  scrollReveal: z.object({
    duration: z.number().default(0.6),
    delay: z.number().default(0.1),
    easing: z
      .tuple([z.number(), z.number(), z.number(), z.number()])
      .default([0.22, 1, 0.36, 1]),
    distance: z.number().default(24),
  }),
  pageTransition: z.object({
    duration: z.number().default(0.8),
  }),
  floating: z.object({
    enabled: z.boolean().default(true),
    duration: z.number().default(4),
  }),
  reducedMotion: z.object({
    disableFloating: z.boolean().default(true),
    disableParallax: z.boolean().default(true),
  }),
})

export type AnimationsConfig = z.infer<typeof animationsSchema>
