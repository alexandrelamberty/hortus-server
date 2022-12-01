import {
  ArgumentsHost,
  Catch, ExceptionFilter, HttpStatus
} from "@nestjs/common";
import { MongoError } from "mongodb";

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log("MongoExceptionFilter", exception);
    switch (exception.code) {
      case 11000:
        response
          .status(HttpStatus.CONFLICT)
          .json({ message: exception.errmsg });
    }
    response.status(HttpStatus.BAD_REQUEST).json({ message: exception.errmsg });
  }
}
