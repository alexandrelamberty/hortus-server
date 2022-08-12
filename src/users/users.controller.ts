import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GROUP_ALL_USERS, GROUP_USER, User } from './schemas/user.schema';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller()
//@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  strategy: 'excludeAll'
})
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/users/:username/profile')
  getProfile() {
    return "UserProfile"
  }

  @Get('/users')
  @SerializeOptions({
    groups: [GROUP_ALL_USERS],
  })
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/users/:username')
  @SerializeOptions({
    groups: [GROUP_USER],
  })
  getByUsername(@Param('username') username: string): Promise<User> {
    return this.usersService.findByUsername(username);
  }

  @Put('/users/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/users/:id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
