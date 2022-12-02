import { ProductStore } from '../../models/product.model';

const store = new ProductStore();
let createdProductId: number;
describe('Product Model', () => {
  it('should have an INDEX method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a SHOW method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a CREATE method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a DELETE method', () => {
    expect(store.delete).toBeDefined();
  });

  it('CREATE method should add a product', async () => {
    const { id, name, price } = await store.create({
      name: 'shoes',
      price: 25
    });
    createdProductId = id;

    expect({ name, price }).toEqual({
      name: 'shoes',
      price: 25
    });
  });

  it('INDEX method should return a list of products', async () => {
    const items = await store.index();
    const names = items.map((item) => item.name);
    const prices = items.map((item) => item.price);
    expect(names).toContain('shoes');
    expect(prices).toContain(25);
  });
  it('SHOW method should return a product by product name', async () => {
    const { name, price } = await store.show(createdProductId);

    expect({ name, price }).toEqual({
      name: 'shoes',
      price: 25
    });
  });

  it('DELETE method should remove a product by product name', async () => {
    await store.delete(createdProductId);
    const result = await store.show(createdProductId);

    // @ts-ignore
    expect(result).toBe(undefined);
  });
});
