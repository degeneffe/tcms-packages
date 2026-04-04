import type { Priority, TestCaseType, ExecutionStatus } from './enums.js'

// ─── Pagination ────────────────────────────────────────────────────────────

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export interface SingleResponse<T> {
  data: T
}

export interface ApiError {
  error: string
  message: string
  statusCode: number
}

// ─── Auth DTOs ─────────────────────────────────────────────────────────────

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface RefreshRequest {
  refreshToken: string
}

// ─── Project DTOs ──────────────────────────────────────────────────────────

export interface CreateProjectRequest {
  name: string
  description?: string
}

export interface UpdateProjectRequest {
  name?: string
  description?: string
  isArchived?: boolean
}

// ─── Tag DTOs ──────────────────────────────────────────────────────────────

export interface CreateTagRequest {
  name: string
  color?: string
}

export interface UpdateTagRequest {
  name?: string
  color?: string
}

// ─── Section DTOs ──────────────────────────────────────────────────────────

export interface CreateSectionRequest {
  name: string
  description?: string
}

export interface UpdateSectionRequest {
  name?: string
  description?: string
}

// ─── Test Case DTOs ────────────────────────────────────────────────────────

export interface CreateTestCaseRequest {
  title: string
  type: TestCaseType
  priority?: Priority
  description?: string
  sectionId?: string
  // Gherkin
  gherkinRaw?: string
  // Script
  preconditions?: string
  steps?: Array<{ orderIndex: number; action: string; expected: string }>
  tagIds?: string[]
}

export interface UpdateTestCaseRequest {
  title?: string
  priority?: Priority
  description?: string
  status?: 'draft' | 'active' | 'deprecated'
  gherkinRaw?: string
  preconditions?: string
  steps?: Array<{ orderIndex: number; action: string; expected: string }>
  tagIds?: string[]
}

export interface ValidateGherkinRequest {
  gherkinRaw: string
}

export interface ValidateGherkinResponse {
  valid: boolean
  errors: Array<{ message: string; line?: number; column?: number }>
  ast: unknown | null
}

export interface TestCaseFilters {
  type?: TestCaseType
  status?: string
  priority?: Priority
  tags?: string
  search?: string
  page?: number
  limit?: number
  sort?: string
}

// ─── Test Plan DTOs ────────────────────────────────────────────────────────

export interface CreateTestPlanRequest {
  name: string
  description?: string
}

export interface UpdateTestPlanRequest {
  name?: string
  description?: string
}

export interface AddTestCasesToPlanRequest {
  testCaseIds: string[]
}

export interface ReorderTestCasesRequest {
  order: string[]
}

// ─── Execution Cycle DTOs ──────────────────────────────────────────────────

export interface CreateCycleRequest {
  name: string
  description?: string
  environment?: string
}

export interface UpdateCycleRequest {
  name?: string
  description?: string
  environment?: string
}

// ─── Test Execution DTOs ───────────────────────────────────────────────────

export interface UpdateExecutionRequest {
  status: ExecutionStatus
  notes?: string
  startedAt?: string
  completedAt?: string
}

export interface BulkUpsertStepResultsRequest {
  steps: Array<{
    stepIndex?: number
    stepText: string
    status: ExecutionStatus
    notes?: string
  }>
}

// ─── Search DTOs ────────────────────────────────────────────────────────────

export type SearchEntityType = 'test_case'

export type SearchMatchedField = 'title' | 'description' | 'gherkin_raw' | 'preconditions' | 'step'

export interface SearchResult {
  entityType: SearchEntityType
  entityId: string
  title: string
  projectId: string
  matchedField: SearchMatchedField
  snippet?: string
}

export interface SearchFilters {
  q: string
  projectId?: string
  page?: number
  limit?: number
}

// ─── Global Test Case List DTOs ─────────────────────────────────────────────

export interface GlobalTestCaseItem {
  id: string
  projectId: string
  projectName: string
  title: string
  type: TestCaseType
  status: 'draft' | 'active' | 'deprecated'
  priority: Priority
  updatedAt: string
  snippet?: string
}

export interface GlobalTestCaseFilters {
  projectId?: string
  type?: TestCaseType
  status?: string
  priority?: Priority
  search?: string
  page?: number
  limit?: number
}
