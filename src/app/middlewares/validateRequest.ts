/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

const validateRequest = (schema: AnyZodObject | ZodEffects<AnyZodObject>) => {
  return async (
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void> => {
    try {
      await schema.parseAsync({
        body: (req as any).body,
        query: (req as any).query,
        params: (req as any).params,
        cookies: (req as any).cookies,
      });
      if (next) next();
    } catch (err) {
      if (next) next(err as any);
    }
  };
};

export default validateRequest;
