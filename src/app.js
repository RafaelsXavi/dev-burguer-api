import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

// rotas para servir arquivos estáticos (imagens)
const uploadPath = resolve(__dirname, '..', 'uploads');
console.log('Upload path:', uploadPath);
app.use('/files', express.static(uploadPath));

app.use(routes);


export default app;
