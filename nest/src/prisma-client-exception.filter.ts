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
      P2003: HttpStatus.INTERNAL_SERVER_ERROR,
      P2004: HttpStatus.INTERNAL_SERVER_ERROR,
      P2005: HttpStatus.BAD_REQUEST,
      P2006: HttpStatus.BAD_REQUEST,
      P2007: HttpStatus.BAD_REQUEST,
      P2008: HttpStatus.BAD_REQUEST,
      P2009: HttpStatus.BAD_REQUEST,
      P2010: HttpStatus.INTERNAL_SERVER_ERROR,
      P2011: HttpStatus.BAD_REQUEST,
      P2012: HttpStatus.BAD_REQUEST,
      P2013: HttpStatus.BAD_REQUEST,
      P2014: HttpStatus.BAD_REQUEST,
      P2015: HttpStatus.NOT_FOUND,
      P2016: HttpStatus.BAD_REQUEST,
      P2017: HttpStatus.BAD_REQUEST,
      P2018: HttpStatus.BAD_REQUEST,
      P2019: HttpStatus.BAD_REQUEST,
      P2020: HttpStatus.BAD_REQUEST,
      P2021: HttpStatus.NOT_FOUND,
      P2022: HttpStatus.NOT_FOUND,
      P2023: HttpStatus.INTERNAL_SERVER_ERROR,
      P2024: HttpStatus.REQUEST_TIMEOUT,
      P2025: HttpStatus.BAD_REQUEST,
      P2026: HttpStatus.NOT_IMPLEMENTED,
      P2027: HttpStatus.INTERNAL_SERVER_ERROR,
      P2028: HttpStatus.INTERNAL_SERVER_ERROR,
      P2030: HttpStatus.BAD_REQUEST,
      P2031: HttpStatus.NOT_IMPLEMENTED,
      P2033: HttpStatus.BAD_REQUEST,
      P2034: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    return exceptionCodes[code] || HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
