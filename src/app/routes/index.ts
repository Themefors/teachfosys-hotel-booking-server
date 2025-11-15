import { Application } from 'express';

const initiateRoutes = (app: Application) => {
  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });
};

export default initiateRoutes;
