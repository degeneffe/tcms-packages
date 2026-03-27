import { View, StyleSheet } from 'react-native'
import type { ExecutionStatusBarProps } from './types.ts'

const COLORS: Record<string, string> = {
  pass: '#22c55e',
  fail: '#ef4444',
  skip: '#f59e0b',
  blocked: '#8b5cf6',
  pending: '#94a3b8',
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
    <View style={styles.bar} accessibilityRole="progressbar" testID="execution-status-bar">
      {segments.map(({ key, value }) => (
        <View
          key={key}
          testID={`statusbar-${key}`}
          style={{ flex: value / total, backgroundColor: COLORS[key] ?? '#e2e8f0' }}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', height: 8, borderRadius: 4, overflow: 'hidden' },
})
