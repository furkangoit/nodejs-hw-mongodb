import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routes/contacts.js';

export const setupServer = () => {
  const app = express();

  // CORS middleware
  app.use(cors());

  // Pino logger middleware
  app.use(pino({
    transport: {
      target: 'pino-pretty'
    }
  }));

  // JSON parsing middleware
  app.use(express.json());

  // Routes
  app.use(contactsRouter);

  // 404 handler for non-existent routes
  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found'
    });
  });

  return app;
};
