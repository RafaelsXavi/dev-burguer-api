import { Router } from 'express';
import multer from 'multer';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';
import ProductController from './app/controllers/ProductController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from "./app/controllers/UserController.js";
import adminMiddleware from './app/middlewares/admin.js';
import authMiddleware from './app/middlewares/auth.js';
import multerConfig from './config/multer.cjs';


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

routes.put('/categories/:id',adminMiddleware,upload.any(),CategoryController.update);
// PUT -> /CATEGORIES/ID


routes.get('/categories', CategoryController.index);


routes.post('/orders',OrderController.store)

routes.get('/orders',OrderController.index)

routes.put('/orders/:id',adminMiddleware,OrderController.update);



export default routes;







//Método HTTP
/*
Post -> Criar
Get -> Buscar
Put -> Alterar/Atualizar
Patch -> Alterar uma informação específica
Delete -> Deletar
*/
