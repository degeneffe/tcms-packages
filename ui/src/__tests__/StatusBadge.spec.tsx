import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StatusBadge } from '../StatusBadge/StatusBadge.web.tsx'

describe('StatusBadge (web)', () => {
  const cases = [
    { status: 'pass',       label: 'Pass',       bg: '#22c55e' },
    { status: 'fail',       label: 'Fail',       bg: '#ef4444' },
    { status: 'skip',       label: 'Skip',       bg: '#f59e0b' },
    { status: 'blocked',    label: 'Blocked',    bg: '#8b5cf6' },
    { status: 'pending',    label: 'Pending',    bg: '#94a3b8' },
    { status: 'draft',      label: 'Draft',      bg: '#e2e8f0' },
    { status: 'active',     label: 'Active',     bg: '#3b82f6' },
    { status: 'deprecated', label: 'Deprecated', bg: '#64748b' },
  ]

  it.each(cases)('shows label "$label" for status "$status"', ({ status, label }) => {
    render(<StatusBadge status={status} />)
    expect(screen.getByRole('status', { name: label })).toBeInTheDocument()
  })

  it.each(cases)('applies correct bg for status "$status"', ({ status, bg }) => {
    render(<StatusBadge status={status} />)
    expect(screen.getByRole('status')).toHaveStyle({ background: bg })
  })

  it('falls back for unknown status', () => {
    render(<StatusBadge status="custom" />)
    const badge = screen.getByRole('status', { name: 'custom' })
    expect(badge).toHaveStyle({ background: '#e2e8f0' })
  })
})
