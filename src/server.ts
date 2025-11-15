import { Application } from 'express';
import http, { Server } from 'http';
import config from './app/config';
import { connectDB } from './app/db/db';
import handleSyncAsyncError from './app/middlewares/handleSyncAsyncError';

const startServer = async (app: Application) => {
  try {
    await connectDB();
    const server: Server = http.createServer(app);

    server.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`);
    });

    handleSyncAsyncError(server);
  } catch (error) {
    console.error('Failed to start server');
    console.error(error);
    process.exit(1);
  }
};

export default startServer;
