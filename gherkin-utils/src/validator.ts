import type { GherkinDocument } from '@cucumber/messages'
import { parseFeature, type GherkinParseError } from './parser.js'

export interface ValidationResult {
  valid: boolean
  errors: GherkinParseError[]
}

export function validateGherkin(source: string): ValidationResult {
  const result = parseFeature(source)
  return { valid: result.valid, errors: result.errors }
}

export function extractFeatureName(ast: GherkinDocument | null): string | null {
  return ast?.feature?.name ?? null
}

export function extractTags(ast: GherkinDocument | null): string[] {
  if (!ast?.feature) return []
  const featureTags = ast.feature.tags?.map((t) => t.name) ?? []
  const scenarioTags =
    ast.feature.children?.flatMap((child) => {
      if (child.scenario) return child.scenario.tags?.map((t) => t.name) ?? []
      if (child.rule) return child.rule.tags?.map((t) => t.name) ?? []
      return []
    }) ?? []
  return [...new Set([...featureTags, ...scenarioTags])]
}

export function countScenarios(ast: GherkinDocument | null): number {
  if (!ast?.feature) return 0
  let count = 0
  for (const child of ast.feature.children ?? []) {
    if (child.scenario) count++
    if (child.rule) {
      for (const ruleChild of child.rule.children ?? []) {
        if (ruleChild.scenario) count++
      }
    }
  }
  return count
}
