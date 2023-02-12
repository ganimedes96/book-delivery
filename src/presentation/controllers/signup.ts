export class SignUpController {
  handleSignUp (httpRequest: any): any {
    return {
      statusCode: 400,
      body: new Error('Name is required')
    }
  }
}
