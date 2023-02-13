import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
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

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('Email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
