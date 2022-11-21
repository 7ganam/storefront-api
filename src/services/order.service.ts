import { Order, OrderStore } from '../models/order.model';

const store = new OrderStore();

export const index = async () => {
  const orders = await store.index();
  return orders;
};

export const show = async (id: number) => {
  const order = await store.show(id);
  const products = await store.showOrderProduct(id);

  return { ...order, products: products };
};

export const create = async (product: Omit<Order, 'id'>) => {
  const newOrder = await store.create(product);
  return newOrder;
};

export const remove = async (id: number) => {
  await store.delete(id);
  return true;
};

export const addProduct = async (
  id: number,
  ProductId: number,
  quantity: number
) => {
  const orderProducts = await store.createOrderProduct({
    product_id: ProductId,
    order_id: id,
    quantity: quantity
  });
  return orderProducts;
};

export const showUserOrders = async (userId: number) => {
  const orders = await store.showByUser(userId);
  return orders;
};

export const showUserCompletedOrders = async (userId: number) => {
  const orders = await showUserOrders(userId);
  const completedOrders = orders.filter((order) => order.status === 'complete');
  return completedOrders;
};

export const completeOrder = async (id: number) => {
  await store.complete(id);
  return { success: true };
};
