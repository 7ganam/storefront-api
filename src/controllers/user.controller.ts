import { Request, Response } from 'express';
import dotenv from 'dotenv';

import { User, UserStore } from '../models/user.model';
import { register, login, remove } from '../services/user.service';
dotenv.config();

const store = new UserStore();

export const getUsers = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

export const registerUser = async (req: Request, res: Response) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.password) {
    res.status(400);
    res.json({ message: 'missing field' });
    return;
  }
  try {
    const user: Omit<User, 'id'> = {
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: req.body.password as string
    };

    const { token, newUser } = await register(
      user.firstname,
      user.lastname,
      user.password
    );
    console.log('token', token);
    res.json({
      token,
      id: newUser.id,
      firstname: newUser.firstname,
      lastname: newUser.lastname
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400);
      res.json({ error: 'id must be number' });
      return;
    }

    const password = req.body.password as string;
    const token = await login(id, password);

    res.header('auth-token', token).send({ token });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400);
    res.json({ error: 'id must be number' });
    return;
  }
  try {
    await remove(id);
    res.json({ status: 'success' });
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};
