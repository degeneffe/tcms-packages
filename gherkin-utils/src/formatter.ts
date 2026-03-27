import type { GherkinDocument, Feature, FeatureChild, Scenario, Step, Tag, TableRow } from '@cucumber/messages'

function formatTags(tags: readonly Tag[]): string {
  if (!tags || tags.length === 0) return ''
  return tags.map((t) => t.name).join(' ') + '\n'
}

function formatStep(step: Step, indent: string): string {
  let result = `${indent}${step.keyword}${step.text}\n`
  if (step.dataTable) {
    for (const row of step.dataTable.rows) {
      const cells = row.cells.map((c) => c.value).join(' | ')
      result += `${indent}  | ${cells} |\n`
    }
  }
  if (step.docString) {
    const delim = step.docString.delimiter || '"""'
    result += `${indent}  ${delim}\n`
    result += step.docString.content
      .split('\n')
      .map((line) => `${indent}  ${line}`)
      .join('\n') + '\n'
    result += `${indent}  ${delim}\n`
  }
  return result
}

function formatScenario(scenario: Scenario, indent: string): string {
  let result = ''
  result += formatTags(scenario.tags ?? []).split('\n').map((l) => (l ? indent + l : '')).join('\n')
  if (scenario.examples && scenario.examples.length > 0) {
    result += `${indent}Scenario Outline: ${scenario.name}\n`
  } else {
    result += `${indent}Scenario: ${scenario.name}\n`
  }
  if (scenario.description) {
    result += scenario.description.split('\n').map((l) => `${indent}  ${l}`).join('\n') + '\n'
  }
  for (const step of scenario.steps ?? []) {
    result += formatStep(step, indent + '  ')
  }
  for (const examples of scenario.examples ?? []) {
    result += `\n${indent}  Examples:\n`
    if (examples.tableHeader) {
      const header = examples.tableHeader.cells.map((c) => c.value).join(' | ')
      result += `${indent}    | ${header} |\n`
    }
    for (const row of examples.tableBody ?? []) {
      const cells = row.cells.map((c) => c.value).join(' | ')
      result += `${indent}    | ${cells} |\n`
    }
  }
  return result
}

export function formatGherkinDocument(doc: GherkinDocument): string {
  if (!doc.feature) return ''
  const feature = doc.feature
  let result = ''

  result += formatTags(feature.tags ?? [])
  result += `Feature: ${feature.name}\n`
  if (feature.description) {
    result += feature.description.split('\n').map((l) => `  ${l}`).join('\n') + '\n'
  }

  for (const child of feature.children ?? []) {
    result += '\n'
    if (child.background) {
      result += `  Background: ${child.background.name}\n`
      for (const step of child.background.steps ?? []) {
        result += formatStep(step, '    ')
      }
    }
    if (child.scenario) {
      result += formatScenario(child.scenario, '  ')
    }
    if (child.rule) {
      result += formatTags(child.rule.tags ?? []).split('\n').map((l) => (l ? '  ' + l : '')).join('\n')
      result += `  Rule: ${child.rule.name}\n`
      for (const ruleChild of child.rule.children ?? []) {
        result += '\n'
        if (ruleChild.background) {
          result += `    Background: ${ruleChild.background.name}\n`
          for (const step of ruleChild.background.steps ?? []) {
            result += formatStep(step, '      ')
          }
        }
        if (ruleChild.scenario) {
          result += formatScenario(ruleChild.scenario, '    ')
        }
      }
    }
  }

  return result
}
