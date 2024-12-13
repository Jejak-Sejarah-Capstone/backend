import { Request, Response, NextFunction } from 'express';

const catchAsync = (controller: (req: Request, res: Response, next:NextFunction) => any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res,next);
    } catch (err) {
      next(err);
    }
  };

export default catchAsync;