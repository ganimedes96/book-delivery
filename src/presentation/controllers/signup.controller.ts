import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handleSignUp (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('Name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('Email'))
    }
    if (!httpRequest.body.password) {
      return badRequest(new MissingParamError('Password'))
    }
  }
}
