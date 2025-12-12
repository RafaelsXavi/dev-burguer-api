import express from 'express';
import routes from './routes.js';
import fileRoutesConfig from './config/fileRoutes.cjs';


const app = express();

// Middleware to log raw request body for debugging
app.use((req, res, next) => {
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            console.log('Raw request body:', data);
            req.rawBody = data;
            next();
        });
    } else {
        next();
    }
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/product-file', fileRoutesConfig);

app.use(routes);


export default app;
