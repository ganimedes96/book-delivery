import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { EmailValidator, AddAccount, AddAccountModel, AccountModel, HttpRequest } from './signup-protocols'
import { SignUpController } from './signup.controller'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}
const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => { resolve(makeFakeAccount()) })
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password',
  role: 'valid_role'

})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    role: 'any_role',
    passwordConfirmation: 'any_password'
  }
})

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        role: 'any_role',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handleSignUp(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('Name')))
  })
  it('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        role: 'any_role',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handleSignUp(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('Email'))
  })
  it('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        role: 'any_role',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handleSignUp(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('Password')))
  })
  it('Should return 400 if no role is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handleSignUp(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('Role')))
  })
  it('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        role: 'any_role'
      }
    }
    const httpResponse = await sut.handleSignUp(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('PasswordConfirmation')))
  })
  it('Should return 400 if passwordConfirmation fails', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        role: 'any_role',
        passwordConfirmation: 'invalid_password'
      }
    }
    const httpResponse = await sut.handleSignUp(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('PasswordConfirmation')))
  })
  it('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.handleSignUp(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('Email')))
  })
  it('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    await sut.handleSignUp(makeFakeRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })
  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handleSignUp(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      role: 'any_role'
    })
  })
  it('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handleSignUp(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => { reject(new Error()) })
    })

    const httpResponse = await sut.handleSignUp(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handleSignUp(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })
})
