import { PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Context = {
  prisma: PrismaClient
}

export interface MockContext {
  prisma: DeepMockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>()
  }
}
