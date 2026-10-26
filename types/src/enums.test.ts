import { describe, expect, it } from 'vitest'
import {
  ATTACHMENT_ENTITY_TYPES,
  CUSTOM_FIELD_TYPES,
  CYCLE_STATUSES,
  EXECUTION_STATUSES,
  PRIORITIES,
  ROLE_PERMISSIONS,
  SEARCH_ENTITY_TYPES,
  SEARCH_MATCHED_FIELDS,
  TEST_CASE_STATUSES,
  TEST_CASE_TYPES,
  USER_ROLES,
} from './index.js'

describe('enum values', () => {
  it('keeps every UserRole value', () => {
    expect(USER_ROLES).toEqual(['admin', 'manager', 'tester', 'viewer'])
  })

  it('keeps every TestCaseType value', () => {
    expect(TEST_CASE_TYPES).toEqual(['gherkin', 'script'])
  })

  it('keeps every TestCaseStatus value', () => {
    expect(TEST_CASE_STATUSES).toEqual(['draft', 'active', 'deprecated'])
  })

  it('keeps every CustomFieldType value', () => {
    expect(CUSTOM_FIELD_TYPES).toEqual(['text', 'single_select', 'multi_select'])
  })

  it('keeps every Priority value', () => {
    expect(PRIORITIES).toEqual(['low', 'medium', 'high', 'critical'])
  })

  it('keeps every ExecutionStatus value', () => {
    expect(EXECUTION_STATUSES).toEqual(['pending', 'pass', 'fail', 'skip', 'blocked'])
  })

  it('keeps every CycleStatus value', () => {
    expect(CYCLE_STATUSES).toEqual(['pending', 'in_progress', 'completed', 'aborted'])
  })

  it('keeps every AttachmentEntityType value', () => {
    expect(ATTACHMENT_ENTITY_TYPES).toEqual(['execution', 'step_result', 'test_case'])
  })

  it('keeps every SearchEntityType value', () => {
    expect(SEARCH_ENTITY_TYPES).toEqual(['test_case'])
  })

  it('keeps every SearchMatchedField value', () => {
    expect(SEARCH_MATCHED_FIELDS).toEqual(['title', 'description', 'gherkin_raw', 'preconditions', 'step'])
  })
})

describe('role constants', () => {
  it('grants permissions to the expected roles', () => {
    expect(ROLE_PERMISSIONS).toEqual({
      read: ['admin', 'manager', 'tester', 'viewer'],
      write: ['admin', 'manager', 'tester'],
      admin: ['admin'],
    })
  })
})
