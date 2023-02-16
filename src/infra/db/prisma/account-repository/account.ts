import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/model/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { PrismaClient } from '@prisma/client'

export class AccountPrismaRepository implements AddAccountRepository {
  private readonly prisma: PrismaClient
  constructor () {
    this.prisma = new PrismaClient()
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.prisma.costumer.create({
      data: accountData
    })
    return account
  }
}
