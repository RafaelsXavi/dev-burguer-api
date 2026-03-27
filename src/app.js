import cors from 'cors';
import express from 'express';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import routes from './routes.js';

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

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error Details:', {
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });

  // Handle custom status codes from services/controllers
  const status = error.status || 500;

  // Handle specific error types
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: error.message,
      details: error.errors,
    });
  }

  if (
    error.name === 'JsonWebTokenError' ||
    error.name === 'TokenExpiredError'
  ) {
    return res.status(401).json({
      error: 'Authentication Error',
      message: error.message || 'Authentication token is invalid or expired',
    });
  }

  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    return res.status(400).json({
      error: 'Database Error',
      message: 'A database validation error occurred',
      details: error.errors.map((e) => e.message),
    });
  }

  // Default error response
  res.status(status).json({
    error: status === 500 ? 'Internal Server Error' : error.name || 'Error',
    message: error.message || 'Something went wrong on our server',
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
  });
});

export default app;
