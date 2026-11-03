import { weddingSchema, themesFileSchema, sectionsFileSchema, animationsSchema } from '../schemas'
import type { WeddingConfig } from '../schemas/wedding'
import type { ThemesFile } from '../schemas/theme'
import type { SectionsFile } from '../schemas/sections'
import type { AnimationsConfig } from '../schemas/animations'
import {
  DEFAULT_WEDDING,
  DEFAULT_THEMES,
  DEFAULT_SECTIONS,
  DEFAULT_ANIMATIONS,
} from './defaults'

async function fetchJson(path: string): Promise<unknown> {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`)
  return res.json()
}

async function safeLoad<T>(
  path: string,
  schema: { parse: (data: unknown) => T },
  fallback: T,
): Promise<T> {
  try {
    const raw = await fetchJson(path)
    return schema.parse(raw)
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`[config] Falling back to defaults for ${path}:`, error)
    }
    return fallback
  }
}

export interface AppConfig {
  wedding: WeddingConfig
  themes: ThemesFile
  sections: SectionsFile
  animations: AnimationsConfig
}

export async function loadAppConfig(): Promise<AppConfig> {
  const base = import.meta.env.BASE_URL
  const [wedding, themes, sections, animations] = await Promise.all([
    safeLoad(`${base}config/wedding.json`, weddingSchema, DEFAULT_WEDDING),
    safeLoad(`${base}config/theme.json`, themesFileSchema, DEFAULT_THEMES),
    safeLoad(`${base}config/sections.json`, sectionsFileSchema, DEFAULT_SECTIONS),
    safeLoad(`${base}config/animations.json`, animationsSchema, DEFAULT_ANIMATIONS),
  ])
  return { wedding, themes, sections, animations }
}
