import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('notifications')
@UseInterceptors(CacheInterceptor)
export class TasksController {
  constructor() {}

  //@CacheKey('myCustomKey')
  //@CacheTTL(300)
  @Get()
  findAll() {
    return "Tasks"
  }

}
