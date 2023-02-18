export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`${paramName} is Invalid`)
    this.name = 'InvalidParamError'
  }
}

export class UserAlreadyExist extends Error {
  constructor (paramName: string) {
    super(`${paramName} already exists!`)
    this.name = 'UserAlreadyExist'
  }
}
