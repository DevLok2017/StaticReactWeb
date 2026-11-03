import type { WeddingConfig } from '../../schemas/wedding'
import { PlaceholderImage } from '../common/PlaceholderImage'

type Family = WeddingConfig['family']['bride']

function MemberList({ title, members }: { title: string; members: { name: string; relation?: string }[] }) {
  if (members.length === 0) return null
  return (
    <div className="mt-4">
      <p className="text-xs tracking-[0.2em] text-[var(--color-gold)] uppercase">{title}</p>
      <ul className="mt-1 space-y-0.5">
        {members.map((member) => (
          <li key={member.name} className="text-[var(--color-text)]">
            {member.name}
            {member.relation && (
              <span className="text-[var(--color-text-muted)]"> — {member.relation}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FamilyCard({ title, name, family }: { title: string; name: string; family: Family }) {
  return (
    <div className="flex flex-col items-center rounded-[var(--radius-lg)] border border-[var(--color-gold)]/30 bg-[var(--color-background-alt)] p-8 text-center shadow-[var(--shadow-soft)]">
      {family.photo && (
        <PlaceholderImage
          src={family.photo}
          alt={`${name} family`}
          className="mb-5 h-28 w-28 rounded-full object-cover shadow-[var(--shadow-soft)]"
        />
      )}
      <p className="text-xs tracking-[0.3em] text-[var(--color-text-muted)] uppercase">{title}</p>
      <h3 className="mt-1 font-script text-3xl text-[var(--color-primary)]">{name}</h3>
      {family.surname && (
        <p className="text-sm text-[var(--color-text-muted)]">{family.surname} Family</p>
      )}

      <MemberList title="Parents" members={family.parents} />
      <MemberList title="Grandparents" members={family.grandparents} />
      <MemberList title="Siblings" members={family.siblings} />
    </div>
  )
}
