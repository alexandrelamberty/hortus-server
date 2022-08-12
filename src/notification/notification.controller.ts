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
//@UseInterceptors(CacheInterceptor)
export class NotificationController {
  constructor() {}

  //@CacheKey('myCustomKey')
  //@CacheTTL(300)
  @Get()
  getAll() {
    return "Notifications"
  }
}
