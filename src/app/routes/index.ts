import { Application } from 'express';

const initiateRoutes = (app: Application) => {
  app.get('/', (_req, res) => {
    res.send('Welcome to Teachfosys hotel booking app backend!');
  });
};

export default initiateRoutes;
