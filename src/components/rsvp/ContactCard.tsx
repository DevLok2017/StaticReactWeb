import { Phone, MessageCircle } from 'lucide-react'
import type { WeddingConfig } from '../../schemas/wedding'
import { PlaceholderImage } from '../common/PlaceholderImage'
import { telLink, whatsappLink } from '../../utils/links'

type Contact = WeddingConfig['rsvp']['bride'][number]

export function ContactCard({ contact, coupleNames }: { contact: Contact; coupleNames: string }) {
  const message = `Hi ${contact.name}, I'm confirming my RSVP for ${coupleNames}'s wedding!`

  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-gold)]/30 bg-[var(--color-background-alt)] p-6 text-center shadow-[var(--shadow-soft)]">
      <PlaceholderImage
        src={contact.photo}
        alt={contact.name}
        label="Photo"
        className="h-20 w-20 rounded-full object-cover"
      />
      <div>
        <h4 className="text-lg text-[var(--color-primary)]">{contact.name}</h4>
        {contact.relationship && (
          <p className="text-xs text-[var(--color-text-muted)]">{contact.relationship}</p>
        )}
      </div>
      <div className="flex gap-3">
        {contact.phone && (
          <a
            href={telLink(contact.phone)}
            aria-label={`Call ${contact.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-gold)] text-[var(--color-secondary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
          >
            <Phone size={16} />
          </a>
        )}
        {(contact.whatsapp ?? contact.phone) && (
          <a
            href={whatsappLink(contact.whatsapp ?? contact.phone!, message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${contact.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-gold)] text-[var(--color-secondary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
          >
            <MessageCircle size={16} />
          </a>
        )}
      </div>
    </div>
  )
}
