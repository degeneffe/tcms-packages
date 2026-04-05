import { View, Text, StyleSheet } from 'react-native'
import type { StatusBadgeProps } from './types'

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  pass:       { label: 'Pass',       bg: '#22c55e', text: '#fff' },
  fail:       { label: 'Fail',       bg: '#ef4444', text: '#fff' },
  skip:       { label: 'Skip',       bg: '#f59e0b', text: '#fff' },
  blocked:    { label: 'Blocked',    bg: '#8b5cf6', text: '#fff' },
  pending:    { label: 'Pending',    bg: '#94a3b8', text: '#fff' },
  draft:      { label: 'Draft',      bg: '#e2e8f0', text: '#475569' },
  active:     { label: 'Active',     bg: '#3b82f6', text: '#fff' },
  deprecated: { label: 'Deprecated', bg: '#64748b', text: '#fff' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { label: status, bg: '#e2e8f0', text: '#475569' }
  return (
    <View
      accessibilityRole="none"
      accessibilityLabel={config.label}
      style={[styles.badge, { backgroundColor: config.bg }]}
      testID={`status-badge-${status}`}
    >
      <Text style={[styles.text, { color: config.text }]}>{config.label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
})
