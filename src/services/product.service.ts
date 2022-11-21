import { Product, ProductStore } from '../models/product.model';

const store = new ProductStore();

export const index = async () => {
  const products = await store.index();
  return products;
};

export const show = async (id: number) => {
  const product = await store.show(id);
  return product;
};

export const create = async (product: Omit<Product, 'id'>) => {
  const newProduct = await store.create(product);
  return newProduct;
};

export const remove = async (id: number) => {
  await store.delete(id);
  return true;
};
