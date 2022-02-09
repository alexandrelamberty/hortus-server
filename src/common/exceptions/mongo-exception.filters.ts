import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { MongoError } from 'mongodb'
import { HttpAdapterHost } from '@nestjs/core'

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
	const response = host.switchToHttp().getResponse();
    console.log(exception)
    switch (exception.code) {
      case 11000:
		response.status(HttpStatus.CONFLICT).json({ message: exception.errmsg });
    }
  }
}
