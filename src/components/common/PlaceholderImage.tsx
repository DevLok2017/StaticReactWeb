import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { cn } from '../../utils/cn'

interface PlaceholderImageProps {
  src?: string
  alt: string
  className?: string
  label?: string
  loading?: 'lazy' | 'eager'
  width?: number
  height?: number
}

export function PlaceholderImage({
  src,
  alt,
  className,
  label,
  loading = 'lazy',
  width,
  height,
}: PlaceholderImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-2 border border-dashed border-[var(--color-gold)]/50 bg-[var(--color-background-alt)] text-[var(--color-text-muted)]',
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <ImageIcon size={28} strokeWidth={1.5} />
        <span className="px-3 text-center text-xs">{label ?? 'Replace with photo'}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      width={width}
      height={height}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
