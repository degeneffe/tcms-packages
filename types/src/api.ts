import type { CustomFieldDefinition, CustomFieldValue } from './entities.js'
import type { CustomFieldType, Priority, TestCaseType, ExecutionStatus, UserRole } from './enums.js'

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

// ─── API Token DTOs ───────────────────────────────────────────────────────

export interface ApiToken {
  id: string
  userId: string
  name: string
  createdAt: string
  expiresAt: string | null
}

export interface CreateApiTokenRequest {
  userId: string
  name: string
  expiresAt: string | null
}

export interface ApiTokenResponse {
  token: string
  apiToken: ApiToken
}

// ─── Project DTOs ──────────────────────────────────────────────────────────

export interface ProjectMemberInput {
  email: string
  role?: 'admin' | 'manager' | 'tester' | 'viewer'
}

export interface CreateProjectRequest {
  name: string
  description?: string
  members?: ProjectMemberInput[]
}

export interface UpdateProjectRequest {
  name?: string
  description?: string
  isArchived?: boolean
}

export interface AddMemberRequest {
  userId?: string
  email?: string
  role?: 'admin' | 'manager' | 'tester' | 'viewer'
}

export interface UpdateMemberRoleRequest {
  role: 'admin' | 'manager' | 'tester' | 'viewer'
}

export interface UpdateMembersRequest {
  members: { userId: string; role: 'admin' | 'manager' | 'tester' | 'viewer' }[]
}

export interface UserProjectSummary {
  projectId: string
  name: string
  slug: string
  role: UserRole
}

export interface AssignUserProjectsRequest {
  projectIds: string[]
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

// ─── Custom Field DTOs ─────────────────────────────────────────────────────

export interface CreateCustomFieldDefinitionRequest {
  name: string
  key: string
  type: CustomFieldType
  options?: string[]
  required?: boolean
  displayOrder?: number
}

export interface UpdateCustomFieldDefinitionRequest {
  name?: string
  key?: string
  type?: CustomFieldType
  options?: string[]
  required?: boolean
  displayOrder?: number
}

export interface DeleteCustomFieldDefinitionRequest {
  fieldId: string
}

export interface SetCustomFieldValueRequest {
  value: string | string[]
}

export interface UpdateCustomFieldValueRequest {
  value: string | string[]
}

export type CustomFieldDefinitionResponse = SingleResponse<CustomFieldDefinition>

export type CustomFieldDefinitionListResponse = SingleResponse<CustomFieldDefinition[]>

export type CustomFieldValueResponse = SingleResponse<CustomFieldValue>

export type CustomFieldValueListResponse = SingleResponse<CustomFieldValue[]>

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
  steps?: { orderIndex: number; action: string; expected: string }[]
  tagIds?: string[]
  customFields?: Record<string, string | string[]>
}

export interface UpdateTestCaseRequest {
  title?: string
  priority?: Priority
  description?: string
  status?: 'draft' | 'active' | 'deprecated'
  gherkinRaw?: string
  preconditions?: string
  sectionId?: string
  steps?: { orderIndex: number; action: string; expected: string }[]
  tagIds?: string[]
  customFields?: Record<string, string | string[]>
}

export interface ValidateGherkinRequest {
  gherkinRaw: string
}

export interface ValidateGherkinResponse {
  valid: boolean
  errors: { message: string; line?: number; column?: number }[]
  ast: unknown
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

export interface CycleComparisonData {
  cycleId: string
  cycleName: string
  environment: string | null
  status: string
  startedAt: string | null
  completedAt: string | null
  total: number
  pass: number
  fail: number
  skip: number
  blocked: number
  pending: number
  passRate: number
}

// ─── Test Execution DTOs ───────────────────────────────────────────────────

export interface UpdateExecutionRequest {
  status: ExecutionStatus
  notes?: string
  startedAt?: string
  completedAt?: string
}

export interface BulkUpsertStepResultsRequest {
  steps: {
    stepIndex?: number
    stepText: string
    status: ExecutionStatus
    notes?: string
  }[]
}

// ─── Search DTOs ────────────────────────────────────────────────────────────

export const SEARCH_ENTITY_TYPES = ['test_case'] as const

export type SearchEntityType = (typeof SEARCH_ENTITY_TYPES)[number]

export const SEARCH_MATCHED_FIELDS = ['title', 'description', 'gherkin_raw', 'preconditions', 'step'] as const

export type SearchMatchedField = (typeof SEARCH_MATCHED_FIELDS)[number]

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

// ─── Report DTOs ────────────────────────────────────────────────────────────

export interface CycleTrendPoint {
  cycleId: string
  cycleName: string
  environment: string | null
  completedAt: string
  passRate: number
  total: number
  byStatus: {
    pass: number
    fail: number
    skip: number
    blocked: number
    pending: number
  }
}

// ─── Dashboard DTOs ───────────────────────────────────────────────────────────

export interface DashboardProject {
  id: string
  name: string
  updatedAt: string
}

export interface DashboardCycle {
  id: string
  name: string
  progress: number
}

export interface DashboardStats {
  totalProjects: number
  totalTestCases: number
  totalTestPlans: number
  passRate: number
}

export interface DashboardRecentActivity {
  type: 'test_case' | 'execution_cycle' | 'test_plan'
  id: string
  name: string
  projectId: string
  projectName: string
  timestamp: string
}

export interface DashboardResponse {
  recentProjects: DashboardProject[]
  inProgressCycles: DashboardCycle[]
  stats: DashboardStats
  recentActivity: DashboardRecentActivity[]
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
