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
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MailService } from './mail.service'

@Controller('mail')
export class MailController {
  constructor(
	private readonly mailService: MailService,
  ) {}
  
  @Get("confirmation")
  sendUserConfirmation() {
    // return this.mailService.sendUserConfirmation()
  }

  @Get("invitation")
  sendUserInvitation() {
    // return this.mailService.sendUserInvitation()
  }
  
}
