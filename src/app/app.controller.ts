import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthService } from "../auth/auth.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Get("/")
  async getHome() {
    return this.appService.getVersion();
  }

  @Get("/version")
  async getVersion() {
    return this.appService.getVersion();
  }
}
