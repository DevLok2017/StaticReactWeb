import { Suspense, useEffect, useState } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { loadAppConfig, type AppConfig } from './config/loadConfig'
import { ConfigContext } from './config/ConfigContext'
import { applyTheme } from './utils/applyTheme'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { InvitationCover } from './components/invitation/InvitationCover'
import { sectionRegistry } from './components/sectionRegistry'

function AppContent({ config }: { config: AppConfig }) {
  const { wedding, sections, social } = {
    ...config,
    social: config.wedding.social,
  }

  const invitationSection = sections.sections.find((s) => s.type === 'invitation')
  const orderedSections = sections.sections
    .filter((s) => s.enabled && s.type !== 'invitation')
    .sort((a, b) => a.order - b.order)

  return (
    <ConfigContext.Provider value={config}>
      <Helmet>
        <title>
          {wedding.coupleNames.bride} &amp; {wedding.coupleNames.groom} — Wedding Invitation
        </title>
        {social?.description && <meta name="description" content={social.description} />}
        {social?.title && <meta property="og:title" content={social.title} />}
        {social?.previewImage && <meta property="og:image" content={social.previewImage} />}
      </Helmet>

      <InvitationCover enabled={invitationSection?.enabled ?? true} />

      <main>
        {orderedSections.map((section) => {
          const Component = sectionRegistry[section.type]
          if (!Component) return null
          return (
            <ErrorBoundary key={section.id}>
              <Suspense fallback={<div className="py-20" />}>
                <Component />
              </Suspense>
            </ErrorBoundary>
          )
        })}
      </main>
    </ConfigContext.Provider>
  )
}

function App() {
  const [config, setConfig] = useState<AppConfig | null>(null)

  useEffect(() => {
    let mounted = true
    loadAppConfig().then((loaded) => {
      if (mounted) setConfig(loaded)
    })
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!config) return
    const theme =
      config.themes.themes.find((t) => t.name === config.themes.activeTheme) ??
      config.themes.themes[0]
    if (theme) applyTheme(theme)
  }, [config])

  if (!config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
        <p className="font-script text-2xl text-[var(--color-primary)]">Loading our story…</p>
      </div>
    )
  }

  return (
    <HelmetProvider>
      <AppContent config={config} />
    </HelmetProvider>
  )
}

export default App
