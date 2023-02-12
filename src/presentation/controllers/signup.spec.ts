import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handleSignUp(httpRequest)
    expect(httpResponse.body).toEqual(new Error('Name is required'))
    expect(httpResponse.statusCode).toBe(400)
  })
  it('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handleSignUp(httpRequest)
    expect(httpResponse.body).toEqual(new Error('Email is required'))
    expect(httpResponse.statusCode).toBe(400)
  })
})
