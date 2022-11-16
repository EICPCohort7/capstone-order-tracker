import path, { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import customerRouter from './routes/CustomerRouter.js';
import addressRouter from './routes/AddressRouter.js';
import productRouter from './routes/ProductRouter.js';
import orderRouter from './routes/OrderRouter.js';
import orderDetailsRouter from './routes/OrderDetailsRouter.js';
import orderStatusRouter from './routes/OrderStatusRouter.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = {
  origin: [/localhost/, /tjx/, /azurewebsites/],
};

let app = express();

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('json spaces', 2);

// API Routers
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/addresses', addressRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/orderdetails', orderDetailsRouter);
app.use('/api/v1/orderstatuses', orderStatusRouter);

export default app;
