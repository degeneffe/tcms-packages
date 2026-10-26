export const USER_ROLES = ['admin', 'manager', 'tester', 'viewer'] as const

export type UserRole = (typeof USER_ROLES)[number]

export const ROLE_PERMISSIONS = {
  read: ['admin', 'manager', 'tester', 'viewer'] as UserRole[],
  write: ['admin', 'manager', 'tester'] as UserRole[],
  admin: ['admin'] as UserRole[],
} as const

export const PROJECT_ADMIN_ROLES = ['admin'] as UserRole[]

export function canManageProjectMembers(role: string | null | undefined): boolean {
  return role != null && (PROJECT_ADMIN_ROLES as string[]).includes(role)
}

export const TEST_CASE_TYPES = ['gherkin', 'script'] as const

export type TestCaseType = (typeof TEST_CASE_TYPES)[number]

export const TEST_CASE_STATUSES = ['draft', 'active', 'deprecated'] as const

export type TestCaseStatus = (typeof TEST_CASE_STATUSES)[number]

export const CUSTOM_FIELD_TYPES = ['text', 'single_select', 'multi_select'] as const

export type CustomFieldType = (typeof CUSTOM_FIELD_TYPES)[number]

export const PRIORITIES = ['low', 'medium', 'high', 'critical'] as const

export type Priority = (typeof PRIORITIES)[number]

export const EXECUTION_STATUSES = ['pending', 'pass', 'fail', 'skip', 'blocked'] as const

export type ExecutionStatus = (typeof EXECUTION_STATUSES)[number]

export const CYCLE_STATUSES = ['pending', 'in_progress', 'completed', 'aborted'] as const

export type CycleStatus = (typeof CYCLE_STATUSES)[number]

export const ATTACHMENT_ENTITY_TYPES = ['execution', 'step_result', 'test_case'] as const

export type AttachmentEntityType = (typeof ATTACHMENT_ENTITY_TYPES)[number]
