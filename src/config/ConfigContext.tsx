import { createContext, useContext } from 'react'
import type { AppConfig } from './loadConfig'

export const ConfigContext = createContext<AppConfig | null>(null)

export function useAppConfig(): AppConfig {
  const ctx = useContext(ConfigContext)
  if (!ctx) throw new Error('useAppConfig must be used within ConfigContext.Provider')
  return ctx
}
