import { Router } from 'express';
import { createRequire } from 'module';
import UserController from "./app/controllers/UserController.js";
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import CategoryController from './app/controllers/CategoryController.js';
import multer from 'multer';
import app from './app.js';
import authMiddleware from './middlewares/auth.js';
import adminMiddleware from './middlewares/admin.js';

const require = createRequire(import.meta.url);
const multerConfig = require('./config/multer.cjs');

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);


routes.use(authMiddleware);


routes.post(
    '/products',
     adminMiddleware,
     upload.any(),
     ProductController.store,
    );
routes.put(
    '/products/:id',
     adminMiddleware,
     upload.any(),
     ProductController.update,
    );

routes.get('/products', ProductController.index);

routes.post(
    '/categories',
    adminMiddleware,
    upload.any(),
    CategoryController.store,
);

routes.put(
    '/categories/:id',
    adminMiddleware,
    upload.any(),
    CategoryController.update,
);// PUT -> /CATEGORIES/ID

routes.get('/categories', CategoryController.index);

export default routes;







//Método HTTP
/*
Post -> Criar
Get -> Buscar
Put -> Alterar/Atualizar
Patch -> Alterar uma informação específica
Delete -> Deletar
*/
