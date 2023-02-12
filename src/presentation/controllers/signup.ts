import { MissingParamsError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handleSignUp (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamsError('Name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamsError('Email'))
    }
    return {
      statusCode: 400,
      body: new Error('Email is required')
    }
  }
}
