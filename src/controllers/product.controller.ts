import { Request, Response } from 'express';
import { index, show, create, remove } from '../services/product.service';
import { Product } from '../models/product.model';
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isNaN(id)) {
      const product = await show(id);
      res.json(product);
    } else {
      res.status(400);
      res.json({ error: 'id must be a number' });
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.price) {
    res.status(400);
    res.json({ message: 'name and price are required' });
    return;
  }
  try {
    const product: Omit<Product, 'id'> = {
      name: req.body.name as string,
      price: req.body.price as unknown as number,
      category: (req.body?.category as string) ?? undefined
    };
    console.log('post', product);

    const newProduct = await create(product);
    console.log('newProduct', newProduct);

    res.json(newProduct);
  } catch (err) {
    console.log('err', err);
    res.status(400);
    res.json(err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isNaN(id)) {
      await remove(id);
      res.json({ status: 'success' });
    } else {
      res.status(400);
      res.json({ error: 'id must be a number' });
    }
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};
