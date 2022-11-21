import express from 'express';
import verifyAuthToken from '../middleware/verifyAuthToken';
import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct
} from '../controllers/product.controller';

const productRouter = express.Router();

productRouter.route('/').get(getProducts).post(verifyAuthToken, createProduct);

productRouter
  .route('/:id')
  .get(getProduct)
  .delete(verifyAuthToken, deleteProduct);

export default productRouter;
