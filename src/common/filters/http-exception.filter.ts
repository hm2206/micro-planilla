import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

interface ParamsException {
  status?: number
  message: string,
  errors?: { [key: string]: string[] },
  name?: string
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: ParamsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception?.status || 501;

    response.status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: exception.message,
        code: exception.name,
        errors: exception.errors
      })
  }
}
