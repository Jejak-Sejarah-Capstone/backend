import { Request, Response, NextFunction } from 'express';
import CustomError from './CustomError';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof CustomError) {
    res.status(error.code).json({
      message: error.message,
    });
  }

  res.status(500).json({ message: error.message });
};

export default errorHandler;