import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { OrderStore } from '../../models/order.model';
import { User, UserStore } from '../../models/user.model';
import { ProductStore } from '../../models/product.model';

dotenv.config();
const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER } = process.env;

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

const userInstance = {
  firstname: 'Ahmed',
  lastname: 'Elghannam'
};

const userInstancePassword = 'Aoe1y381o';

const productInstance = {
  name: 'shoes',
  price: 4
};

let createdUserId: number;
let createdProductId: number;
let createdOrderId: number;
let createdOrderProduct: number;

describe('Order Model', () => {
  beforeAll(async () => {
    const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

    const user: Omit<User, 'id'> = {
      ...userInstance,
      password: hashPassword as string
    };

    const createdUser = await userStore.create(user);

    createdUserId = createdUser?.id;

    const createdProduct = await productStore.create(productInstance);
    createdProductId = createdProduct?.id;
  });

  it('should have an INDEX method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a SHOW method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a CREATE method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a DELETE method', () => {
    expect(store.delete).toBeDefined();
  });

  it('CREATE method should add an order', async () => {
    const { id, status, user_id } = await store.create({
      status: 'active', // ordered - active - delivered
      user_id: createdUserId
    });

    createdOrderId = id;

    expect({ status, user_id }).toEqual({
      status: 'active',
      user_id: createdUserId
    });
  });

  it('INDEX method should return a list of all orders', async () => {
    const result = await store.index();
    const { status, user_id } = result[result.length - 1];
    expect({ status, user_id }).toEqual({
      status: 'active',
      user_id: createdUserId
    });
  });

  it('SHOW method should return the orders of a user', async () => {
    const result = await store.show(createdOrderId);

    const { status, user_id } = result;
    expect({ status, user_id }).toEqual({
      status: 'active',
      user_id: createdUserId
    });
  });

  it('CREATE order product method should add an order with product quantity and product id', async () => {
    // @ts-ignore
    const { id, quantity, order_id, product_id } =
      await store.createOrderProduct({
        quantity: 4,
        order_id: createdOrderId,
        product_id: createdProductId
      });

    createdOrderProduct = id;

    expect({ quantity, order_id, product_id }).toEqual({
      quantity: 4,
      order_id: createdOrderId,
      product_id: createdProductId
    });
  });

  it('Show order products method should return a list of orders products connected to order id', async () => {
    // @ts-ignore
    const result = await store.showOrderProduct(createdOrderId);
    const { quantity, order_id, product_id } = result[result.length - 1];
    expect({ quantity, order_id, product_id }).toEqual({
      quantity: 4,
      order_id: createdOrderId,
      product_id: createdProductId
    });
  });

  it('DELETE order product method should remove an order product by order product id', async () => {
    const result = await store.deleteOrderProduct(createdOrderProduct);
    // @ts-ignore
    expect(result).toBe(undefined);
  });

  afterAll(async () => {
    await orderStore.deleteOrderProduct(createdOrderProduct);
    await productStore.delete(createdProductId);
    await orderStore.delete(createdOrderId);
    await userStore.delete(createdUserId);
  });
});
