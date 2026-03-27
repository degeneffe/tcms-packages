import type { StatusBadgeProps } from './types.ts'

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  pass:       { label: 'Pass',       bg: '#22c55e', text: 'white' },
  fail:       { label: 'Fail',       bg: '#ef4444', text: 'white' },
  skip:       { label: 'Skip',       bg: '#f59e0b', text: 'white' },
  blocked:    { label: 'Blocked',    bg: '#8b5cf6', text: 'white' },
  pending:    { label: 'Pending',    bg: '#94a3b8', text: 'white' },
  draft:      { label: 'Draft',      bg: '#e2e8f0', text: '#475569' },
  active:     { label: 'Active',     bg: '#3b82f6', text: 'white' },
  deprecated: { label: 'Deprecated', bg: '#64748b', text: 'white' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { label: status, bg: '#e2e8f0', text: '#475569' }
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
