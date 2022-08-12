import {
  Body,
  Controller,
  HttpCode,
  Logger, Post,
  Request,
  Res,
  UseGuards
} from '@nestjs/common'
import { Response } from 'express'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'
import RequestWithUser from './requestWithUser.interface'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.authService.registerUser(createUserDto)
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Request() req: RequestWithUser, @Res() response: Response) : Promise<{}> {
    const {user} = req;
    response.setHeader('Set-Cookie', this.authService.getCookieWithJwtToken(user._id));
    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Request() req, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

}
