import { Request, Response } from "express";

const notFoundHandler = (req: Request, res: Response) => {
  res.send("Route not found!");
};

export default notFoundHandler;
