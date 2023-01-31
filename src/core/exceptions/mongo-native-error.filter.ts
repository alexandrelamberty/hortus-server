import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { MongoError } from "mongodb";

@Catch(MongoError)
export class MongoNativeErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(MongoNativeErrorFilter.name);
  catch(exception: MongoError, host: ArgumentsHost) {
    this.logger.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = 404;
    const message = exception.message || null;

    const body = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      endpoint: request.url,
    };

    this.logger.error(`${statusCode} ${message}`);
    response.status(statusCode).json(body);
  }
}
