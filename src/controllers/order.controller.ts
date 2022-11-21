import { Request, Response } from 'express';
import {
  index,
  show,
  create,
  remove,
  addProduct,
  showUserOrders,
  showUserCompletedOrders,
  completeOrder
} from '../services/order.service';
import { Order } from '../models/order.model';

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json({ error: err?.message ?? 'something went wrong' });
    } else {
      res.json({ error: 'something went wrong' });
    }
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isNaN(id)) {
      const order = await show(id);
      res.json(order);
    } else {
      res.status(400);
      res.json({ error: 'id must be a number' });
    }
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json({ error: err?.message ?? 'something went wrong' });
    } else {
      res.json({ error: 'something went wrong' });
    }
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Omit<Order, 'id'> = {
      user_id: req.body.user_id as number,
      status: 'active'
    };

    const newOrder = await create(order);

    res.json(newOrder);
  } catch (err) {
    console.log('err', err);
    res.status(400);
    if (err instanceof Error) {
      res.json({ error: err?.message ?? 'something went wrong' });
    } else {
      res.json({ error: 'something went wrong' });
    }
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isNaN(id)) {
      await remove(id);
      res.json({ status: 'success' });
    } else {
      res.status(400);
      res.json({ error: 'id must be a number' });
    }
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json({ error: err?.message ?? 'something went wrong' });
    } else {
      res.json({ error: 'something went wrong' });
    }
  }
};

export const addOrderProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400);
      res.json({ error: 'id must be number' });
      return;
    }
    const ProductId = parseInt(req.body['product-id']);
    if (Number.isNaN(ProductId)) {
      res.status(400);
      res.json({ error: 'product id must be number' });
      return;
    }

    const quantity = parseInt(req.body.quantity);
    if (Number.isNaN(quantity)) {
      res.status(400);
      res.json({ error: 'quantity i must be number' });
      return;
    }
    const newOrder = await addProduct(id, ProductId, quantity);

    res.json(newOrder);
  } catch (err) {
    console.log('err', err);
    res.status(400);
    if (err instanceof Error) {
      res.json({ error: err?.message ?? 'something went wrong' });
    } else {
      res.json({ error: 'something went wrong' });
    }
  }
};

export const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.user_id);
    console.log('userId', userId);
    if (Number.isNaN(userId)) {
      res.status(400);
      res.json({ error: 'user id must be number' });
      return;
    }
    const order = await showUserOrders(userId);
    res.json(order);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json({ error: err?.message ?? 'something went wrong' });
    } else {
      res.json({ error: 'something went wrong' });
    }
  }
};

export const getCompleteOrdersByUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.user_id);
    if (Number.isNaN(userId)) {
      res.status(400);
      res.json({ error: 'user id must be number' });
      return;
    }
    const order = await showUserCompletedOrders(userId);
    res.json(order);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json({ error: err?.message ?? 'something went wrong' });
    } else {
      res.json({ error: 'something went wrong' });
    }
  }
};

export const setOrderAsCompleted = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400);
      res.json({ error: 'id must be number' });
      return;
    }
    const order = await completeOrder(id);
    console.log('order', order);
    res.json(order);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json({ error: err?.message ?? 'something went wrong' });
    } else {
      res.json({ error: 'something went wrong' });
    }
  }
};
