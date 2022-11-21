import express from 'express';
import verifyAuthToken from '../middleware/verifyAuthToken';
import {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
  addOrderProduct,
  getOrdersByUser,
  getCompleteOrdersByUser,
  setOrderAsCompleted
} from '../controllers/order.controller';

const orderRouter = express.Router();

orderRouter.route('/').get(getOrders).post(verifyAuthToken, createOrder);
orderRouter.route('/:id').get(getOrder).delete(verifyAuthToken, deleteOrder);
orderRouter.route('/users/:user_id').get(verifyAuthToken, getOrdersByUser);
orderRouter
  .route('/completed/users/:user_id')
  .get(verifyAuthToken, getCompleteOrdersByUser);
orderRouter.route('/:id/products').post(verifyAuthToken, addOrderProduct);
orderRouter.route('/:id/complete').put(verifyAuthToken, setOrderAsCompleted);

export default orderRouter;
