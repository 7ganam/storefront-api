import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, UserStore } from '../models/user.model';

dotenv.config();
const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, JWT_TOKEN_SECRET } = process.env;

const store = new UserStore();

export const index = async () => {
  const users = await store.index();
  return users;
};

export const show = async (id: number) => {
  const user = await store.show(id);
  return user;
};

export const register = async (
  firstName: string,
  lastName: string,
  password: string
) => {
  const pepperedPassword = `${password}${BCRYPT_PEPPER}`;
  const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
  const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

  const user: Omit<User, 'id'> = {
    firstname: firstName,
    lastname: lastName,
    password: hashPassword as string
  };

  const newUser = await store.create(user);
  const token = jwt.sign({ id: newUser.id }, JWT_TOKEN_SECRET as string);
  return { token, newUser };
};

export const login = async (id: number, password: string) => {
  try {
    const foundUser = await store.show(id);
    if (!foundUser) {
      throw new Error('User not found');
    }

    const pepperedPassword = `${password}${BCRYPT_PEPPER}`;
    const validPassword = bcrypt.compareSync(
      pepperedPassword,
      foundUser.password
    );
    if (!validPassword) {
      throw new Error('Password is wrong');
    }

    const token = jwt.sign({ id: foundUser.id }, JWT_TOKEN_SECRET as string);
    return token;
  } catch (err) {
    throw new Error('something went wrong');
  }
};

export const remove = async (id: number) => {
  try {
    await store.delete(id);
    return { status: 'success' };
  } catch (error) {
    throw new Error('could not delete user');
  }
};
