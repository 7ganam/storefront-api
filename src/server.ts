import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import productRouter from './routes/product.route';
import usersRouter from './routes/user.route';
import orderRouter from './routes/order.route';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
  res.send('This is homepage of storefront project');
});

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/orders', orderRouter);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
