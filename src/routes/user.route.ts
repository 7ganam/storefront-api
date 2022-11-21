import express from 'express';
import verifyAuthToken from '../middleware/verifyAuthToken';
import {
  loginUser,
  registerUser,
  getUsers,
  deleteUser
} from '../controllers/user.controller';

const usersRouter = express.Router();

usersRouter.route('/').get(verifyAuthToken, getUsers);
usersRouter.route('/login/:id').get(loginUser);
usersRouter.route('/:id').delete(verifyAuthToken, deleteUser);
usersRouter.route('/signup').post(registerUser);
export default usersRouter;
