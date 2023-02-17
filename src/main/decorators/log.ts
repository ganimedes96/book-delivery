import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  constructor (controller: Controller) {
    this.controller = controller
  }

  async handleSignUp (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handleSignUp(httpRequest)
    return httpResponse
  }
}
