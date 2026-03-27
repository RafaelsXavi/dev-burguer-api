import app from './app.js';
import './database/index.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API disponível em: http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit the process, but log the error
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
