import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  AddAccount
} from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handleSignUp (httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.body.name) {
        return badRequest(new MissingParamError('Name'))
      }
      if (!httpRequest.body.email) {
        return badRequest(new MissingParamError('Email'))
      }
      if (!httpRequest.body.password) {
        return badRequest(new MissingParamError('Password'))
      }
      if (!httpRequest.body.passwordConfirmation) {
        return badRequest(new MissingParamError('PasswordConfirmation'))
      }
      const { password, passwordConfirmation, email, name } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('PasswordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('Email'))
      }
      const account = this.addAccount.add({
        name,
        email,
        password
      })
      return {
        statusCode: 200,
        body: account
      }
    } catch (error) {
      return serverError()
    }
  }
}
