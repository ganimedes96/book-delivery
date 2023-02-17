import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountPrismaRepository } from '../../infra/db/prisma/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup.controller'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSigUpController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPrismaRepository = new AccountPrismaRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountPrismaRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
