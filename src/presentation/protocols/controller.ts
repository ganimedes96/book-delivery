import { HttpResponse, HttpRequest } from './http'

export interface Controller {
  handleSignUp: (HttpRequest: HttpRequest) => HttpResponse
}
