import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import RequestWithUser from "./interfaces/request-with-user";
import { User } from "../users/schemas/user.schema";

@Controller("auth")
export class AuthController {
  constructor(
    private service: AuthService,
    private userService: UsersService
  ) {}

  @Post("register")
  registerUser(@Body() body: RegisterUserDto) {
    return this.service.registerUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  loginUser(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.service.getCookieWithJwtToken(user.id);
    response.setHeader("Set-Cookie", cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader("Set-Cookie", this.service.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @Get("validate/:token")
  validateUser(@Param("token") token: string) {
    return this.service.validateToken(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get("whoami")
  async whoami(@Req() req: any): Promise<User> {
    req.user.password = undefined;
    return req.user;
  }
}
