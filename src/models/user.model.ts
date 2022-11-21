import client from '../database';

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: Omit<User, 'id'>): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.password
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.firstname}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
