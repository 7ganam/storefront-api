import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';

const request = supertest(app);
const { JWT_TOKEN_SECRET } = process.env;
const token = jwt.sign({ id: 1 }, JWT_TOKEN_SECRET as string);
// console.log('I ran ---------------------');

let createdProductId: number;

describe('Product controllers: ', () => {
  it('should return a new product after it is created', (done) => {
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

  it('should fail if the name is missing', (done) => {
    const data = {
      name: '',
      price: 323
    };
    request
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('should fetch all products', (done) => {
    request
      .get('/api/v1/products')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should return a product by id', (done) => {
    console.log('get by id');
    request
      .get(`/api/v1/products/${createdProductId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(
        {
          id: createdProductId,
          name: 'product 1',
          price: 323,
          category: 'test'
        },
        done
      );
  });

  it('should fail if the id is wrong', (done) => {
    request
      .get(`/api/v1/products/clearlyThisIsNotAnId`)
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('should be able to delete product', (done) => {
    request
      .delete(`/api/v1/products/${createdProductId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
  });
});
