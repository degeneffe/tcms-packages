import { describe, it, expect } from 'vitest'
import { parseFeature } from '../parser.js'
import { formatGherkinDocument } from '../formatter.js'

describe('formatGherkinDocument', () => {
  it('returns empty string for document without feature', () => {
    expect(formatGherkinDocument({ comments: [], uri: '' })).toBe('')
  })

  it('formats a simple feature', () => {
    const source = 'Feature: Login\n  Scenario: Success\n    Given I login'
    const { ast } = parseFeature(source)
    const formatted = formatGherkinDocument(ast!)
    expect(formatted).toContain('Feature: Login')
    expect(formatted).toContain('Scenario: Success')
    expect(formatted).toContain('Given I login')
  })

  it('preserves tags', () => {
    const source = '@smoke\nFeature: Tagged\n  @tag1\n  Scenario: Test\n    Given step'
    const { ast } = parseFeature(source)
    const formatted = formatGherkinDocument(ast!)
    expect(formatted).toContain('@smoke')
    expect(formatted).toContain('@tag1')
  })

  it('formats Scenario Outline with Examples', () => {
    const source = `Feature: Outline
  Scenario Outline: Login <user>
    Given I login as "<user>"

    Examples:
      | user  |
      | admin |
      | guest |`
    const { ast } = parseFeature(source)
    const formatted = formatGherkinDocument(ast!)
    expect(formatted).toContain('Scenario Outline')
    expect(formatted).toContain('Examples:')
    expect(formatted).toContain('admin')
    expect(formatted).toContain('guest')
  })

  it('formats steps with DataTable', () => {
    const source = `Feature: Tables
  Scenario: Data
    Given the following users:
      | name  |
      | Alice |`
    const { ast } = parseFeature(source)
    const formatted = formatGherkinDocument(ast!)
    expect(formatted).toContain('name')
    expect(formatted).toContain('Alice')
  })
})
