import { Lock } from 'lucide-react'
import { usePrivacy } from '../../context/PrivacyContext'
import { cn } from '../../utils/cn'

export function ShowDetailsButton({ className }: { className?: string }) {
  const { lockEnabled, unlocked, openUnlockModal } = usePrivacy()

  if (!lockEnabled || unlocked) return null

  return (
    <button
      type="button"
      onClick={openUnlockModal}
      className={cn(
        'group inline-flex items-center gap-1.5 text-xs tracking-[0.12em] text-[var(--color-text-muted)] uppercase transition-colors hover:text-[var(--color-primary)]',
        className,
      )}
    >
      <Lock
        size={12}
        className="text-[var(--color-gold)] transition-transform group-hover:scale-110"
        aria-hidden
      />
      Show details
    </button>
  )
}
