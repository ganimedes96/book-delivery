import { InvalidParamError, MissingParamError, UserAlreadyExist } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  AddAccount
} from './signup-protocols'
import { PrismaClient } from '@prisma/client'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handleSignUp (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.email) {
        return badRequest(new MissingParamError('Email'))
      }
      if (!httpRequest.body.name) {
        return badRequest(new MissingParamError('Name'))
      }
      if (!httpRequest.body.password) {
        return badRequest(new MissingParamError('Password'))
      }
      if (!httpRequest.body.role) {
        return badRequest(new MissingParamError('Role'))
      }

      if (!httpRequest.body.passwordConfirmation) {
        return badRequest(new MissingParamError('PasswordConfirmation'))
      }
      const { password, passwordConfirmation, email, name, role } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('PasswordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('Email'))
      }
      const prisma = new PrismaClient()
      const userAlreadyExist = await prisma.costumer.findUnique({ where: { email } })
      console.log(userAlreadyExist)

      if (userAlreadyExist?.email === email) {
        return badRequest(new UserAlreadyExist('User'))
      }
      const account = await this.addAccount.add({
        name,
        email,
        password,
        role
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
