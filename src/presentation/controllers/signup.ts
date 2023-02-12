import { MissingParamsError } from '../errors/missing-params-error'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handleSignUp (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamsError('Name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamsError('Email')
      }
    }
    return {
      statusCode: 400,
      body: new Error('Email is required')
    }
  }
}
