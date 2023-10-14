import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const { code, clientVersion, name } = exception;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = this.getStatusCode(code);

    response.status(statusCode).json({
      type: name,
      code: code,
      version: clientVersion,
    });
  }

  private getStatusCode(code: string): HttpStatus {
    const exceptionCodes = {
      P2000: HttpStatus.BAD_REQUEST,
      P2001: HttpStatus.NOT_FOUND,
      P2002: HttpStatus.CONFLICT,
    };

    return exceptionCodes[code] || HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
