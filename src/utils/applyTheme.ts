import type { Theme } from '../schemas/theme'

export function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.style.setProperty('--color-primary', theme.colors.primary)
  root.style.setProperty('--color-secondary', theme.colors.secondary)
  root.style.setProperty('--color-accent', theme.colors.accent)
  root.style.setProperty('--color-background', theme.colors.background)
  root.style.setProperty('--color-background-alt', theme.colors.backgroundAlt)
  root.style.setProperty('--color-text', theme.colors.text)
  root.style.setProperty('--color-text-muted', theme.colors.textMuted)
  root.style.setProperty('--color-gold', theme.colors.gold)
  root.style.setProperty('--color-jewel', theme.colors.jewel)
  root.style.setProperty('--font-heading', theme.fonts.heading)
  root.style.setProperty('--font-script', theme.fonts.script)
  root.style.setProperty('--font-body', theme.fonts.body)
  root.style.setProperty('--radius-sm', theme.radius.sm)
  root.style.setProperty('--radius-md', theme.radius.md)
  root.style.setProperty('--radius-lg', theme.radius.lg)
  root.style.setProperty('--shadow-soft', theme.shadow.soft)
  root.style.setProperty('--shadow-strong', theme.shadow.strong)
}
