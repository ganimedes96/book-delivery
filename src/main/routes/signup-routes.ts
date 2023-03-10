import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSigUpController } from '../factories/signup'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adaptRoute(makeSigUpController()))
}
