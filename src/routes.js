import { Router } from "express";
import User from "./app/models/User.js";
import { v4 } from "uuid";
import UserController from "./app/controllers/UserController.js";

const routes = new Router();


routes.post('/users', UserController.store);


export default routes;







//Método HTTP
/*
Post -> Criar
Get -> Buscar
Put -> Alterar/Atualizar
Patch -> Alterar uma informação específica
Delete -> Deletar
*/
