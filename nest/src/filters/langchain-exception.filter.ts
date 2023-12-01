import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, Logger } from '@nestjs/common';
import type { Response } from 'express';

@Catch(Error)
export class OpenAIExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const { name, message, stack } = exception;
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (name === 'TimeoutError') {
      res.status(504).send(message);
    } else if (name === 'AbortError') {
      res.status(500).send(message);
    } else {
      res.status(500).send(message);
    }
    new Logger('OpenAIException').error(stack);
  }
}
