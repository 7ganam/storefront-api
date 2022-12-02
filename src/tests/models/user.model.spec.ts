import dotenv from 'dotenv';
import { User, UserStore } from '../../models/user.model';

dotenv.config();

const store = new UserStore();

describe('User Model', () => {
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
});
