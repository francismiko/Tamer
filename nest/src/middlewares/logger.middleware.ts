import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction): void {
  res.on('finish', () => {
    const { method, originalUrl } = req;
    const { statusCode } = res;
    const logger = new Logger(`Response ${statusCode}`);
    const message = `${method} ${originalUrl}`;

    if (statusCode >= 500) {
      logger.error(message);
    } else if (statusCode >= 400) {
      logger.warn(message);
    } else {
      logger.log(message);
    }
  });
  new Logger('Request').log(`${req.method} ${req.originalUrl}`);
  next();
}
