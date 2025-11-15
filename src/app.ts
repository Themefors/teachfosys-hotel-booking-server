import express from 'express';
import initiateMiddlewares from './app/middlewares';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
import initiateRoutes from './app/routes';
import startServer from './server';

const app = express();

// Middlewares
initiateMiddlewares(app);

// Routes
initiateRoutes(app);

// Not found handler
app.use('*', notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

startServer(app);
