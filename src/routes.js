import { Router } from 'express';
import multer from 'multer';

import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';
import ProductController from './app/controllers/ProductController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';

import adminMiddleware from './app/middlewares/admin.js';
import authMiddleware from './app/middlewares/auth.js';
import validator from './app/middlewares/validator.js';

import {
  categoryStoreSchema,
  categoryUpdateSchema,
} from './app/schemas/CategorySchema.js';
import {
  orderStoreSchema,
  orderUpdateSchema,
} from './app/schemas/OrderSchema.js';
import {
  productStoreSchema,
  productUpdateSchema,
} from './app/schemas/ProductSchema.js';
import { sessionStoreSchema } from './app/schemas/SessionSchema.js';
import { userStoreSchema } from './app/schemas/UserSchema.js';

import multerConfig from './config/multer.js';

const routes = new Router();
const upload = multer(multerConfig);

// Public Routes
routes.post('/users', validator(userStoreSchema), UserController.store);
routes.post(
  '/sessions',
  validator(sessionStoreSchema),
  SessionController.store,
);

// Products
routes.get('/products', authMiddleware, ProductController.index);
routes.post(
  '/products',
  authMiddleware,
  upload.any(),
  validator(productStoreSchema),
  ProductController.store,
);
routes.put(
  '/products/:id',
  authMiddleware,
  upload.any(),
  validator(productUpdateSchema),
  ProductController.update,
);

// Categories
routes.get('/categories', authMiddleware, CategoryController.index);
routes.post(
  '/categories',
  authMiddleware,
  upload.any(),
  validator(categoryStoreSchema),
  CategoryController.store,
);
routes.put(
  '/categories/:id',
  authMiddleware,
  upload.any(),
  validator(categoryUpdateSchema),
  CategoryController.update,
);

// Orders
routes.get('/orders', authMiddleware, OrderController.index);
routes.post('/orders', authMiddleware, validator(orderStoreSchema), OrderController.store);
routes.put(
  '/orders/:id',
  authMiddleware,
  adminMiddleware,
  validator(orderUpdateSchema),
  OrderController.update,
);

export default routes;

//Método HTTP
/*
Post -> Criar
Get -> Buscar
Put -> Alterar/Atualizar
Patch -> Alterar uma informação específica
Delete -> Deletar
*/
