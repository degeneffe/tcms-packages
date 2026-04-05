import type { StatusBadgeProps } from './types'
import { colors } from '../tokens'

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  pass:       { label: 'Pass',       bg: colors.statusPass,    text: 'white' },
  fail:       { label: 'Fail',       bg: colors.statusFail,    text: 'white' },
  skip:       { label: 'Skip',       bg: colors.statusSkip,    text: 'white' },
  blocked:    { label: 'Blocked',    bg: colors.statusBlocked, text: 'white' },
  pending:    { label: 'Pending',    bg: colors.statusPending, text: 'white' },
  draft:      { label: 'Draft',      bg: colors.border,        text: colors.textSubdued },
  active:     { label: 'Active',     bg: colors.primary,       text: 'white' },
  deprecated: { label: 'Deprecated', bg: colors.textMuted,     text: 'white' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { label: status, bg: colors.border, text: colors.textSubdued }
  return (
    <span
      role="status"
      aria-label={config.label}
      style={{
        background: config.bg,
        color: config.text,
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {config.label}
    </span>
  )
}
