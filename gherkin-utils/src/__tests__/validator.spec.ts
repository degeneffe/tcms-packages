import { describe, it, expect } from 'vitest'
import { validateGherkin, extractFeatureName, extractTags, countScenarios } from '../validator.js'
import { parseFeature } from '../parser.js'

describe('validateGherkin', () => {
  it('returns valid=true for valid Gherkin', () => {
    const result = validateGherkin(`Feature: Login
  Scenario: Login success
    Given I am on the login page
    When I login
    Then I am authenticated`)
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('returns valid=false for invalid Gherkin', () => {
    const result = validateGherkin('not gherkin')
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })
})

describe('extractFeatureName', () => {
  it('extracts feature name from AST', () => {
    const { ast } = parseFeature('Feature: My Feature\n  Scenario: test\n    Given step')
    expect(extractFeatureName(ast ?? null)).toBe('My Feature')
  })

  it('returns null for null AST', () => {
    expect(extractFeatureName(null)).toBeNull()
  })
})

describe('extractTags', () => {
  it('extracts tags from feature and scenarios', () => {
    const source = `@feature-tag
Feature: Tagged
  @scenario-tag
  Scenario: Test
    Given step`
    const { ast } = parseFeature(source)
    const tags = extractTags(ast ?? null)
    expect(tags).toContain('@feature-tag')
    expect(tags).toContain('@scenario-tag')
  })

  it('deduplicates tags', () => {
    const source = `@shared
Feature: Shared tags
  @shared
  Scenario: Test
    Given step`
    const { ast } = parseFeature(source)
    const tags = extractTags(ast ?? null)
    expect(tags.filter((t) => t === '@shared')).toHaveLength(1)
  })

  it('returns empty array for null AST', () => {
    expect(extractTags(null)).toEqual([])
  })
})

describe('countScenarios', () => {
  it('counts scenarios at feature level', () => {
    const source = `Feature: Multi
  Scenario: One
    Given step
  Scenario: Two
    Given step`
    const { ast } = parseFeature(source)
    expect(countScenarios(ast ?? null)).toBe(2)
  })

  it('counts scenarios inside rules', () => {
    const source = `Feature: Rules
  Rule: First rule
    Scenario: Inside rule
      Given step
  Scenario: Outside rule
    Given step`
    const { ast } = parseFeature(source)
    expect(countScenarios(ast ?? null)).toBe(2)
  })

  it('returns 0 for null AST', () => {
    expect(countScenarios(null)).toBe(0)
  })
})
