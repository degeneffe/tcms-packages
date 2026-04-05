import type { TagChipProps } from './types'

export function TagChip({ name, color = '#64748b', onRemove }: TagChipProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: color,
        color: '#fff',
        padding: '2px 8px',
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 500,
      }}
      data-testid={`tag-chip-${name}`}
    >
      {name}
      {onRemove != null && (
        <button
          onClick={onRemove}
          aria-label={`Remove tag ${name}`}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'inherit',
            padding: 0,
            lineHeight: 1,
            fontSize: 14,
          }}
        >
          ×
        </button>
      )}
    </span>
  )
}
