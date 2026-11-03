import type { WeddingConfig } from '../../schemas/wedding'
import { PlaceholderImage } from '../common/PlaceholderImage'

type Profile = WeddingConfig['profiles']['bride']

export function CoupleProfile({ profile, align = 'left' }: { profile: Profile; align?: 'left' | 'right' }) {
  return (
    <div
      className={`flex flex-col items-center gap-6 rounded-[var(--radius-lg)] bg-[var(--color-background-alt)] p-8 text-center shadow-[var(--shadow-soft)] sm:flex-row ${
        align === 'right' ? 'sm:flex-row-reverse sm:text-right' : 'sm:text-left'
      }`}
    >
      <PlaceholderImage
        src={profile.photo}
        alt={profile.name}
        label={`${profile.name} photo`}
        className="h-40 w-40 shrink-0 rounded-full object-cover shadow-[var(--shadow-soft)]"
      />
      <div>
        <h3 className="font-script text-3xl text-[var(--color-primary)]">{profile.name}</h3>
        {profile.culturalBackground && (
          <p className="mt-1 text-xs tracking-[0.2em] text-[var(--color-gold)] uppercase">
            {profile.culturalBackground}
          </p>
        )}
        {profile.intro && <p className="mt-3 text-sm text-[var(--color-text)]">{profile.intro}</p>}

        {profile.traits.length > 0 && (
          <div className={`mt-4 flex flex-wrap gap-2 ${align === 'right' ? 'sm:justify-end' : ''}`}>
            {profile.traits.map((trait) => (
              <span
                key={trait}
                className="rounded-full border border-[var(--color-gold)]/50 px-3 py-1 text-xs text-[var(--color-secondary)]"
              >
                {trait}
              </span>
            ))}
          </div>
        )}

        {profile.hobbies.length > 0 && (
          <p className="mt-3 text-xs text-[var(--color-text-muted)]">
            {profile.hobbies.join(' · ')}
          </p>
        )}
      </div>
    </div>
  )
}
