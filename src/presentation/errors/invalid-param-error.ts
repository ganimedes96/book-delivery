export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`${paramName} is Invalid`)
    this.name = 'InvalidParamError'
  }
}
