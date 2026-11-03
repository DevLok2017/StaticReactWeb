import { z } from 'zod'

export const themeSchema = z.object({
  name: z.string(),
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    background: z.string(),
    backgroundAlt: z.string(),
    text: z.string(),
    textMuted: z.string(),
    gold: z.string(),
    jewel: z.string().default('#2f6f66'),
  }),
  fonts: z.object({
    heading: z.string(),
    script: z.string(),
    body: z.string(),
  }),
  radius: z.object({
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
  }),
  shadow: z.object({
    soft: z.string(),
    strong: z.string(),
  }),
})

export const themesFileSchema = z.object({
  activeTheme: z.string(),
  themes: z.array(themeSchema),
})

export type Theme = z.infer<typeof themeSchema>
export type ThemesFile = z.infer<typeof themesFileSchema>
