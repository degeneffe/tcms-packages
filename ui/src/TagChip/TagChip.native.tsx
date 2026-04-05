import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import type { TagChipProps } from './types'

export function TagChip({ name, color = '#64748b', onRemove }: TagChipProps) {
  return (
    <View style={[styles.chip, { backgroundColor: color }]} testID={`tag-chip-${name}`}>
      <Text style={styles.text}>{name}</Text>
      {onRemove != null && (
        <TouchableOpacity onPress={onRemove} accessibilityLabel={`Remove tag ${name}`} hitSlop={8}>
          <Text style={styles.removeText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: { color: '#fff', fontSize: 12, fontWeight: '500' },
  removeText: { color: '#fff', fontSize: 14, lineHeight: 14 },
})
