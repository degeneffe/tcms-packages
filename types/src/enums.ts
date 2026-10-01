export type UserRole = 'admin' | 'manager' | 'tester' | 'viewer'

export const ROLE_PERMISSIONS = {
  read: ['admin', 'manager', 'tester', 'viewer'] as UserRole[],
  write: ['admin', 'manager', 'tester'] as UserRole[],
  admin: ['admin'] as UserRole[],
} as const

export const PROJECT_ADMIN_ROLES = ['admin'] as UserRole[]

export function canManageProjectMembers(role: UserRole | string | null | undefined): boolean {
  return role != null && (PROJECT_ADMIN_ROLES as string[]).includes(role)
}

export type TestCaseType = 'gherkin' | 'script'

export type TestCaseStatus = 'draft' | 'active' | 'deprecated'

export type Priority = 'low' | 'medium' | 'high' | 'critical'

export type ExecutionStatus = 'pending' | 'pass' | 'fail' | 'skip' | 'blocked'

export type CycleStatus = 'pending' | 'in_progress' | 'completed' | 'aborted'

export type AttachmentEntityType = 'execution' | 'step_result' | 'test_case'
