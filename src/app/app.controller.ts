import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from '../auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('/')
  async getVersion() {
    return this.appService.getVersion();
  }
}
