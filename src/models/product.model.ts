import client from '../database';

export type Product = {
  id: number;
  name: string;
  price: number;
  category?: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT * from products';
      const conn = await client.connect();
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get all products. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Unable to find product ${id}. Error: ${err}`);
    }
  }

  async create(p: Omit<Product, 'id'>): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2 ,$3) RETURNING *';

      const conn = await client.connect();
      const result = await conn.query(sql, [p.name, p.price, p?.category]);
      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Unable to add new product ${p.name}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Unable to delete product ${id}. Error: ${err}`);
    }
  }
}
