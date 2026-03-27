import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ExecutionStatusBar } from '../ExecutionStatusBar/ExecutionStatusBar.web.tsx'

describe('ExecutionStatusBar (web)', () => {
  it('renders nothing when total is 0', () => {
    const { container } = render(<ExecutionStatusBar pass={0} fail={0} skip={0} pending={0} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a progressbar role', () => {
    render(<ExecutionStatusBar pass={5} fail={2} skip={1} pending={2} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders segment for each non-zero status', () => {
    render(<ExecutionStatusBar pass={5} fail={2} skip={0} pending={3} />)
    expect(screen.getByTestId('statusbar-pass')).toBeInTheDocument()
    expect(screen.getByTestId('statusbar-fail')).toBeInTheDocument()
    expect(screen.queryByTestId('statusbar-skip')).not.toBeInTheDocument()
    expect(screen.getByTestId('statusbar-pending')).toBeInTheDocument()
  })

  it('applies correct colors to segments', () => {
    render(<ExecutionStatusBar pass={1} fail={1} skip={0} pending={0} />)
    expect(screen.getByTestId('statusbar-pass')).toHaveStyle({ backgroundColor: '#22c55e' })
    expect(screen.getByTestId('statusbar-fail')).toHaveStyle({ backgroundColor: '#ef4444' })
  })

  it('renders blocked segment when provided', () => {
    render(<ExecutionStatusBar pass={3} fail={1} skip={0} pending={0} blocked={2} />)
    expect(screen.getByTestId('statusbar-blocked')).toBeInTheDocument()
    expect(screen.getByTestId('statusbar-blocked')).toHaveStyle({ backgroundColor: '#8b5cf6' })
  })
})
