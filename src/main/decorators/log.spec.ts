import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
  it('Should call controller handleSignUp', async () => {
    class ControllerStub implements Controller {
      async handleSignUp (HttpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          statusCode: 200,
          body: {
            name: 'hudson'
          }
        }
        return await new Promise(resolve => { resolve(httpResponse) })
      }
    }
    const controllerStub = new ControllerStub()
    const handleSignUpSpy = jest.spyOn(controllerStub, 'handleSignUp')

    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        passwword: 'eny_password',
        passwordConfirmation: 'any_passwordConfirmation',
        role: 'any_role'
      }
    }
    await sut.handleSignUp(httpRequest)
    expect(handleSignUpSpy).toHaveBeenCalledWith(httpRequest)
  })
})
