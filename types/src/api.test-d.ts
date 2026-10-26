import { describe, expectTypeOf, it } from 'vitest'
import type {
  AssignUserProjectsRequest,
  CreateProjectRequest,
  PaginatedResponse,
  PaginationMeta,
  UserProjectSummary,
  UserRole,
} from './index.js'

describe('API types', () => {
  it('keeps the UserProjectSummary contract', () => {
    expectTypeOf<UserProjectSummary>().toEqualTypeOf<{
      projectId: string
      name: string
      slug: string
      role: UserRole
    }>()
  })

  it('keeps the AssignUserProjectsRequest contract', () => {
    expectTypeOf<AssignUserProjectsRequest>().toEqualTypeOf<{
      projectIds: string[]
    }>()
  })

  it('keeps the CreateProjectRequest contract', () => {
    expectTypeOf<CreateProjectRequest>().toEqualTypeOf<{
      name: string
      description?: string
      members?: { email: string; role?: UserRole }[]
    }>()
  })

  it('keeps the PaginatedResponse contract', () => {
    expectTypeOf<PaginatedResponse<PaginationMeta>>().toEqualTypeOf<{
      data: PaginationMeta[]
      meta: PaginationMeta
    }>()
  })
})
