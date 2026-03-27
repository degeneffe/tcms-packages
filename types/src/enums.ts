export type UserRole = 'admin' | 'manager' | 'tester' | 'viewer'

export type TestCaseType = 'gherkin' | 'script'

export type TestCaseStatus = 'draft' | 'active' | 'deprecated'

export type Priority = 'low' | 'medium' | 'high' | 'critical'

export type ExecutionStatus = 'pending' | 'pass' | 'fail' | 'skip' | 'blocked'

export type CycleStatus = 'pending' | 'in_progress' | 'completed' | 'aborted'

export type AttachmentEntityType = 'execution' | 'step_result' | 'test_case'
