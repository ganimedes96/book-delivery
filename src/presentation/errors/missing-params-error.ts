
export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`${paramName} is required`)
    this.name = 'MissingParamError'
  }
}

export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`${paramName} is Invalid`)
    this.name = 'InvalidParamError'
  }
}
