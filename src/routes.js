import { Router } from 'express';
import UserController from "./app/controllers/UserController.js";
import SessionController from './app/controllers/SessionController.js';

const routes = new Router();

const userController = new UserController();
const sessionController = new SessionController();

routes.post('/users', userController.store);

routes.post('/sessions', sessionController.store);


export default routes;







//Método HTTP
/*
Post -> Criar
Get -> Buscar
Put -> Alterar/Atualizar
Patch -> Alterar uma informação específica
Delete -> Deletar
*/
