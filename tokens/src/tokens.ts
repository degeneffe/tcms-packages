/**
 * TCMS Design Tokens
 *
 * Decision record: JavaScript constant tokens were chosen over Tailwind CSS or CSS Modules
 * because the existing codebase uses inline React styles exclusively. Tokens provide a
 * single source of truth for design values without requiring a build-system change or
 * a migration away from the established styling pattern. Components continue to use
 * inline `style={{ ... }}` objects, but reference token values instead of hardcoded literals.
 *
 * Usage:
 *   import { colors, spacing, typography, radii } from '@tcms/tokens'
 *   style={{ background: colors.bgSurface, padding: spacing[4], borderRadius: radii.lg }}
 */

// ─── Colors ────────────────────────────────────────────────────────────────

export const colors = {
  // Backgrounds
  bgPage: '#f8fafc',
  bgSurface: '#ffffff',
  bgMuted: '#f1f5f9',

  // Borders
  border: '#e2e8f0',
  borderStrong: '#cbd5e1',

  // Text
  textPrimary: '#0f172a',
  textBase: '#1e293b',
  textSecondary: '#334155',
  textMuted: '#64748b',
  textSubdued: '#475569',
  textDisabled: '#94a3b8',
  textSubtle: '#cbd5e1',

  // Interactive
  primary: '#3b82f6',
  primaryBg: '#eff6ff',
  primaryText: '#1d4ed8',

  // Destructive / error (distinct from statusFail execution badge)
  colorError: '#dc2626',

  // Execution status
  statusPass: '#22c55e',
  statusFail: '#ef4444',
  statusSkip: '#f59e0b',
  statusBlocked: '#8b5cf6',
  statusPending: '#94a3b8',

  // Test case status
  statusActive: '#22c55e',
  statusDraft: '#94a3b8',
  statusDeprecated: '#f59e0b',

  // Priority
  priorityCritical: '#ef4444',
  priorityHigh: '#f97316',
  priorityMedium: '#3b82f6',
  priorityLow: '#94a3b8',
} as const

// ─── Spacing ───────────────────────────────────────────────────────────────
// Values in pixels (use as numbers in React inline styles)

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  12: 48,
} as const

// ─── Typography ────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontFamilyMono: 'monospace',
  fontSize: {
    xs: 11,
    sm: 12,
    base: 13,
    md: 14,
    lg: 15,
    xl: 17,
    '2xl': 22,
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const

// ─── Border Radius ─────────────────────────────────────────────────────────

export const radii = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  '2xl': 12,
  full: 9999,
} as const
