import type { ExecutionStatusBarProps } from './types'
import { colors } from '../tokens'

const COLORS: Record<string, string> = {
  pass: colors.statusPass,
  fail: colors.statusFail,
  skip: colors.statusSkip,
  blocked: colors.statusBlocked,
  pending: colors.statusPending,
}

export function ExecutionStatusBar({ pass, fail, skip, pending, blocked = 0 }: ExecutionStatusBarProps) {
  const total = pass + fail + skip + pending + blocked
  if (total === 0) return null

  const segments = [
    { key: 'pass', value: pass },
    { key: 'fail', value: fail },
    { key: 'skip', value: skip },
    { key: 'blocked', value: blocked },
    { key: 'pending', value: pending },
  ].filter((s) => s.value > 0)

  return (
    <div
      role="progressbar"
      aria-label="Execution status"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={pass}
      style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', width: '100%' }}
    >
      {segments.map(({ key, value }) => (
        <div
          key={key}
          title={`${key}: ${value}`}
          data-testid={`statusbar-${key}`}
          style={{
            flex: value / total,
            backgroundColor: COLORS[key] ?? colors.border,
          }}
        />
      ))}
    </div>
  )
}
