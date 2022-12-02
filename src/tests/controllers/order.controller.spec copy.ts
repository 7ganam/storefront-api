import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';

const request = supertest(app);
const { JWT_TOKEN_SECRET } = process.env;
const token = jwt.sign({ id: 1 }, JWT_TOKEN_SECRET as string);
// console.log('I ran ---------------------');

let createdUserId: number;
let createdProductId: number;
let createdOrderId: number;
describe('Orders controller: ', () => {
  it('should be able to create a product to be used with creating an order', (done) => {
    console.log('create');
    const data = {
      name: 'product 1',
      price: 323,
      category: 'test'
    };
    request
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        createdProductId = res.body.id;
        done();
      });
  });

  it('should be able to sign up a user to be used with creating an order', (done) => {
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
  it('should be able to create a new order', (done) => {
    const data = {
      user_id: 9
    };
    request
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        createdOrderId = res.body.id;
        done();
      });
  });
  it('should fail to create a new order if user_id is wrong', (done) => {
    const data = {
      user_id: 2256646818161
    };
    request
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
  it('should be able to add product to order', (done) => {
    const data = {
      'product-id': createdProductId,
      quantity: 121
    };
    request
      .post(`/api/v1/orders/${createdOrderId}/products`)
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('should be able to delete product', (done) => {
    request
      .delete(`/api/v1/orders/${createdOrderId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
  });
  it('should be able to delete product', (done) => {
    request
      .delete(`/api/v1/products/${createdProductId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
  });
  it('should be able to delete account', (done) => {
    request
      .delete(`/api/v1/users/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
  });
});
