import { Application } from "express";
import cors from "cors";
import express from "express";

const initiateMiddlewares = (app: Application) => {
  app.use(cors());
  app.use(express.json());
};

export default initiateMiddlewares;
