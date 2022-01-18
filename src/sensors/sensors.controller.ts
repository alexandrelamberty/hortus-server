import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateSensorDto } from './dto/create-sensor.dto'
import { UpdateSensorDto } from './dto/update-sensor.dto'
import { SensorsService } from './sensors.service'

@Controller('sensors')
export class SensorsController {
  constructor(private readonly usersService: SensorsService) {}

  @Post()
  create(@Body() createUserDto: CreateSensorDto) {
    console.log(createUserDto)
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateSensorDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id)
  }
}
