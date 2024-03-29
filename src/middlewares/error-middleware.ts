import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../errors';

export function errorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status: number = err.status ?? 500;
  const message: string = err.message ?? 'Internal server error.';

  res.status(status).json({
    status,
    message,
  });
}
