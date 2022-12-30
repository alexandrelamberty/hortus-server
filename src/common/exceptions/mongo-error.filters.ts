import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { Error } from "mongoose";

@Catch(Error)
export class MongoErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(MongoErrorFilter.name);
  catch(exception: Error, host: ArgumentsHost) {
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
