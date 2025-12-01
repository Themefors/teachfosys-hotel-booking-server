import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import connectRedis from './config/redis';
import { errorlogger, logger } from './shared/logger';

/**
 * Bootstrap the server
 * @remarks
 * This function will start the server and listen for incoming requests.
 * It will also setup the error handlers for uncaught exceptions and unhandled rejections.
 * When the server receives a SIGTERM signal, it will exit gracefully.
 */
async function bootstrap() {
  // Connect to Redis
  await connectRedis();

  // Connect to MongoDB
  if (config.database_url) {
    await mongoose.connect(config.database_url);
    logger.info('MongoDB connected successfully');
  }

  const server: Server = app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    errorlogger.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();
