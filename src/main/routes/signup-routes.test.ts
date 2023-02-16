import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  it('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'hudson',
        email: 'hudson@email.com',
        password: '123',
        passwordConfirmation: '123',
        role: 'costumer'
      })
      .expect(200)
  })
})
