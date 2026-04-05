import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { TagChip } from '../TagChip/TagChip.web'

describe('TagChip (web)', () => {
  it('renders tag name', () => {
    render(<TagChip name="smoke" />)
    expect(screen.getByText('smoke')).toBeInTheDocument()
  })

  it('applies custom background color', () => {
    render(<TagChip name="regression" color="#3b82f6" />)
    const chip = screen.getByTestId('tag-chip-regression')
    expect(chip).toHaveStyle({ background: '#3b82f6' })
  })

  it('does not render remove button when onRemove is absent', () => {
    render(<TagChip name="smoke" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders remove button when onRemove is provided', () => {
    render(<TagChip name="smoke" onRemove={() => {}} />)
    expect(screen.getByRole('button', { name: 'Remove tag smoke' })).toBeInTheDocument()
  })

  it('calls onRemove when remove button is clicked', async () => {
    const onRemove = vi.fn()
    const user = userEvent.setup()
    render(<TagChip name="smoke" onRemove={onRemove} />)
    await user.click(screen.getByRole('button', { name: 'Remove tag smoke' }))
    expect(onRemove).toHaveBeenCalledOnce()
  })
})
