import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { Error } from "mongoose";

@Catch(Error.ValidationError)
export class MongoValidationFilter implements ExceptionFilter {
  private readonly logger = new Logger(MongoValidationFilter.name);
  catch(exception: Error.ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = 400;
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
