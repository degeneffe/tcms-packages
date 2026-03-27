import { describe, it, expect } from 'vitest'
import { parseFeature } from '../parser.js'

const SIMPLE_FEATURE = `Feature: User login
  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    Then I should be redirected to the dashboard`

const FEATURE_WITH_BACKGROUND = `Feature: Shopping cart
  Background:
    Given I am a logged-in user

  Scenario: Add item to cart
    When I click "Add to cart"
    Then the item appears in my cart`

const FEATURE_WITH_SCENARIO_OUTLINE = `Feature: Data driven tests
  Scenario Outline: Login with different users
    Given I am on the login page
    When I enter "<username>" and "<password>"
    Then I should see "<result>"

    Examples:
      | username | password | result    |
      | admin    | secret   | dashboard |
      | user     | pass123  | home      |`

const FEATURE_WITH_TAGS = `@smoke @auth
Feature: Authentication

  @happy-path
  Scenario: Login
    Given I am on the login page
    When I login
    Then I am authenticated`

const FEATURE_WITH_DATATABLE = `Feature: Users
  Scenario: Create multiple users
    Given the following users exist:
      | name  | email           |
      | Alice | alice@test.com  |
      | Bob   | bob@test.com    |`

const FEATURE_WITH_DOCSTRING = `Feature: API
  Scenario: Post JSON body
    When I send a POST request with body:
      \"\"\"
      {
        "name": "test"
      }
      \"\"\"
    Then the response status is 200`

const FEATURE_WITH_RULE = `Feature: Premium users
  Rule: Premium members get discounts
    Scenario: Premium user checkout
      Given I am a premium member
      When I checkout
      Then I get a 10% discount`

describe('parseFeature', () => {
  it('parses a simple Feature/Scenario', () => {
    const result = parseFeature(SIMPLE_FEATURE)
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
    expect(result.ast?.feature?.name).toBe('User login')
    expect(result.ast?.feature?.children).toHaveLength(1)
  })

  it('parses Feature with Background', () => {
    const result = parseFeature(FEATURE_WITH_BACKGROUND)
    expect(result.valid).toBe(true)
    const children = result.ast?.feature?.children ?? []
    expect(children.some((c) => c.background)).toBe(true)
  })

  it('parses Scenario Outline with Examples', () => {
    const result = parseFeature(FEATURE_WITH_SCENARIO_OUTLINE)
    expect(result.valid).toBe(true)
    const scenario = result.ast?.feature?.children?.find((c) => c.scenario)?.scenario
    expect(scenario?.examples).toHaveLength(1)
    expect(scenario?.examples?.[0].tableBody).toHaveLength(2)
  })

  it('parses tags at Feature and Scenario level', () => {
    const result = parseFeature(FEATURE_WITH_TAGS)
    expect(result.valid).toBe(true)
    const featureTags = result.ast?.feature?.tags?.map((t) => t.name)
    expect(featureTags).toContain('@smoke')
    expect(featureTags).toContain('@auth')
    const scenario = result.ast?.feature?.children?.find((c) => c.scenario)?.scenario
    expect(scenario?.tags?.map((t) => t.name)).toContain('@happy-path')
  })

  it('parses steps with DataTable', () => {
    const result = parseFeature(FEATURE_WITH_DATATABLE)
    expect(result.valid).toBe(true)
    const scenario = result.ast?.feature?.children?.find((c) => c.scenario)?.scenario
    const stepWithTable = scenario?.steps?.find((s) => s.dataTable)
    expect(stepWithTable).toBeDefined()
    expect(stepWithTable?.dataTable?.rows).toHaveLength(3) // header + 2 data rows
  })

  it('parses steps with DocString', () => {
    const result = parseFeature(FEATURE_WITH_DOCSTRING)
    expect(result.valid).toBe(true)
    const scenario = result.ast?.feature?.children?.find((c) => c.scenario)?.scenario
    const stepWithDoc = scenario?.steps?.find((s) => s.docString)
    expect(stepWithDoc).toBeDefined()
    expect(stepWithDoc?.docString?.content).toContain('"name"')
  })

  it('parses Feature with Rule', () => {
    const result = parseFeature(FEATURE_WITH_RULE)
    expect(result.valid).toBe(true)
    const ruleChild = result.ast?.feature?.children?.find((c) => c.rule)
    expect(ruleChild?.rule?.name).toBe('Premium members get discounts')
  })

  it('returns valid=false and errors for invalid Gherkin', () => {
    // A Scenario before a Feature is a structural parse error
    const result = parseFeature('Scenario: Orphan\n  Given step\nFeature: Too late')
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
    expect(result.errors[0].message).toBeTruthy()
  })

  it('returns null AST on parse error', () => {
    const result = parseFeature('this is not gherkin at all !!!!')
    expect(result.valid).toBe(false)
    expect(result.ast).toBeNull()
  })
})
