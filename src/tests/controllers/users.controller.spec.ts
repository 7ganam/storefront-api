import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';

const request = supertest(app);
const { JWT_TOKEN_SECRET } = process.env;
const token = jwt.sign({ id: 1 }, JWT_TOKEN_SECRET as string);
// console.log('I ran ---------------------');

let createdUserId: number;

describe('Product controllers: ', () => {
  it('should be able to sign up', (done) => {
    const data = {
      firstname: 'omar',
      lastname: 'Elghannam',
      password: '123'
    };
    request
      .post('/api/v1/users/signup')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        createdUserId = res.body.id;
        done();
      });
  });

  it('fails to signup if some field is missing', (done) => {
    const data = {
      firstname: '',
      lastname: 'Elghannam',
      password: '123'
    };
    request
      .post('/api/v1/users/signup')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('should be able to login with password', (done) => {
    const data = {
      password: '123'
    };
    request
      .get(`/api/v1/users/login/${createdUserId}`)
      .send(data)
      .expect(200, done);
  });

  it('should fail to login with wrong password', (done) => {
    const data = {
      password: 'aefaef'
    };
    request
      .get(`/api/v1/users/login/${createdUserId}`)
      .send(data)
      .expect(400, done);
  });

  it('should be able to delete account', (done) => {
    request
      .delete(`/api/v1/users/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
  });
});
