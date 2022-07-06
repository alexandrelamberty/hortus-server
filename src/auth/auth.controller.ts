import {
  Body,
  Controller,
  HttpCode,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async signin(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.authService.registerUser(createUserDto)
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() response: Response) {
    console.log(req.user)
    response.setHeader('Set-Cookie', 'hello');
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Request() req: any, @Res() response: Response) {
    return response.sendStatus(200)
  }

  /*
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
  */
}
