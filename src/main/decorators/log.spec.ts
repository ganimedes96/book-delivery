import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { serverError } from '../../presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

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
const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stack: string): Promise<void> {
      await new Promise<void>(resolve => { resolve() })
    }
  }
  return new LogErrorRepositoryStub()
}
interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
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
  it('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest.spyOn(controllerStub, 'handleSignUp').mockReturnValueOnce(new Promise(resolve => { resolve(error) }))
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
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
