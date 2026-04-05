import type {
  AttachmentEntityType,
  CycleStatus,
  ExecutionStatus,
  Priority,
  TestCaseStatus,
  TestCaseType,
  UserRole,
} from './enums.js'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  slug: string
  description: string | null
  ownerId: string
  isArchived: boolean
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: string
  projectId: string
  name: string
  color: string | null
}

export interface TestCaseSection {
  id: string
  projectId: string
  name: string
  description: string | null
  orderIndex: number
  createdAt: string
  updatedAt: string
}

export interface TestCase {
  id: string
  projectId: string
  sectionId: string | null
  title: string
  type: TestCaseType
  status: TestCaseStatus
  priority: Priority
  description: string | null
  // Gherkin fields
  gherkinRaw: string | null
  gherkinAst: unknown | null
  featureName: string | null
  // Script fields
  preconditions: string | null
  steps: TestStep[]
  tags: Tag[]
  createdBy: string
  deletedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface TestStep {
  id: string
  testCaseId: string
  orderIndex: number
  action: string
  expected: string
  createdAt: string
}

export interface TestPlan {
  id: string
  projectId: string
  name: string
  description: string | null
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface TestPlanCase {
  testPlanId: string
  testCaseId: string
  orderIndex: number
}

export interface ExecutionCycle {
  id: string
  testPlanId: string
  name: string
  description: string | null
  status: CycleStatus
  environment: string | null
  startedAt: string | null
  completedAt: string | null
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface TestExecution {
  id: string
  cycleId: string
  testCaseId: string
  testCaseTitle?: string | null
  assignedTo: string | null
  status: ExecutionStatus
  notes: string | null
  startedAt: string | null
  completedAt: string | null
  durationMs: number | null
  createdAt: string
  updatedAt: string
  testCase?: {
    type: TestCaseType
    gherkinRaw: string | null
    steps: Array<{ id: string; orderIndex: number; action: string; expected: string }>
  } | null
}

export interface StepResult {
  id: string
  executionId: string
  stepIndex: number
  stepText: string
  status: ExecutionStatus
  notes: string | null
  createdAt: string
}

export interface Attachment {
  id: string
  entityType: AttachmentEntityType
  entityId: string
  filename: string
  mimeType: string
  sizeBytes: number
  storagePath: string
  uploadedBy: string
  createdAt: string
}

export interface TestCaseComment {
  id: string
  testCaseId: string
  projectId: string
  authorId: string
  body: string
  createdAt: string
  updatedAt: string
}

export interface ProjectStats {
  totalTestCases: number
  activeTestCases: number
  totalTestPlans: number
  totalCycles: number
  lastCyclePassRate: number | null
}
