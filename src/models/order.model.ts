import client from '../database';

export type Order = {
  id: number;
  user_id: number;
  status: 'active' | 'complete';
};

export type OrderProduct = {
  id: number;
  product_id: number;
  order_id: number;
  quantity: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const sql = 'SELECT * from orders';
      const conn = await client.connect();
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      console.log('err', err);
      throw new Error(`Unable to get all orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Unable to find order ${id}. Error: ${err}`);
    }
  }

  async showByUser(userId: number): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [userId]);
      const order = result.rows;

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Unable to find order of user${userId}. Error: ${err}`);
    }
  }

  async create(o: Omit<Order, 'id'>): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [o.user_id, o.status]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Unable to add new order ${o.user_id}. Error: ${err}`);
    }
  }

  async delete(order_id: number): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [order_id]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Unable to delete order ${order_id}. Error: ${err}`);
    }
  }

  async createOrderProduct(o: Omit<OrderProduct, 'id'>): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        o.quantity,
        o.order_id,
        o.product_id
      ]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to add product ${o.product_id} to order ${o.order_id}: ${err}`
      );
    }
  }

  async showOrderProduct(orderId: number): Promise<OrderProduct[]> {
    try {
      const sql =
        'SELECT * FROM orders_products  INNER JOIN products ON orders_products.product_id = products.id and orders_products.order_id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [orderId]);
      const orderProducts = result.rows;

      conn.release();

      return orderProducts;
    } catch (err) {
      console.log('err', err);
      throw new Error(
        `Unable to find order products of order ${orderId}. Error: ${err}`
      );
    }
  }

  async deleteOrderProduct(orderProductId: number): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders_products WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [orderProductId]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to delete order product ${orderProductId}. Error: ${err}`
      );
    }
  }

  async complete(id: number): Promise<Order> {
    try {
      const sql = 'UPDATE orders SET status = ($1) WHERE id=($2)';
      const conn = await client.connect();
      const result = await conn.query(sql, ['complete', id]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Unable to updated order ${id}. Error: ${err}`);
    }
  }
}
