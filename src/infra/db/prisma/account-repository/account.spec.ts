import { AccountPrismaRepository } from './account'
import { prismaMock } from '../helper/singleton'
import { PrismaClient } from '@prisma/client'

describe('Account Prisma Repository', () => {
  const prisma = new PrismaClient()
  const makeSut = (): AccountPrismaRepository => {
    return new AccountPrismaRepository()
  }

  beforeEach(async () => {
    const costumers = prisma.costumer
    await costumers.deleteMany({})
  })

  it('Should return an account on success', async () => {
    const sut = makeSut()
    const account = {
      id: '2',
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      role: 'any_role'
    }

    prismaMock.costumer.create.mockResolvedValue(account)
    const result = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      role: 'any_role'
    })

    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
    expect(result.name).toBe('any_name')
    expect(result.email).toBe('any_email@email.com')
    expect(result.password).toBe('any_password')
    expect(result.role).toBe('any_role')
  })
})
