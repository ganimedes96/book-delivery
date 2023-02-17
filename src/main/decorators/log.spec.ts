import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
}

const makeController = (): Controller => {
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
  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
  }
}

describe('LogController Decorator', () => {
  it('Should call controller handleSignUp', async () => {
    const { controllerStub, sut } = makeSut()
    const handleSignUpSpy = jest.spyOn(controllerStub, 'handleSignUp')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'eny_password',
        passwordConfirmation: 'any_passwordConfirmation',
        role: 'any_role'
      }
    }
    await sut.handleSignUp(httpRequest)
    expect(handleSignUpSpy).toHaveBeenCalledWith(httpRequest)
  })
  it('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'eny_password',
        passwordConfirmation: 'any_passwordConfirmation',
        role: 'any_role'
      }
    }
    const httpResponse = await sut.handleSignUp(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'hudson'
      }
    })
  })
})
