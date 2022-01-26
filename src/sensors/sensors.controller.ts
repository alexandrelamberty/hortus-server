import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateMeasurementDto } from './dto/create-measurement.dto'
import { CreateSensorDto } from './dto/create-sensor.dto'
import { UpdateSensorDto } from './dto/update-sensor.dto'
import { NetworkService } from './network.service'
import { SensorsService } from './sensors.service'

@Controller('sensors')
export class SensorsController {
  constructor(
	private readonly sensorsService: SensorsService,
	private readonly networkService: NetworkService
  ) {}

  // NetworkService

  @Get('scan')
  scanNetwork() {
    return this.networkService.scanNetwork()
  }

  @Get('reverse/:ip')
  dnsRevers(@Param('ip') ip: string) {
    return this.networkService.dnsReverse(ip)
  }

  @Get('lookup/:ip')
  dnslookupservice(@Param('ip') ip: string, @Query('port') port: number) {
    return this.networkService.dnsLookupService(ip, port)
  }

  // SensorsService
  
  @Get('/:sensorid/measurements')
  getMeasurement() {
    return 'measurements'
  }

  @Post('/:sensorid/measurements')
  addMeasurement(@Param('sensorid') id:string, @Body() createMeasurementDto: CreateMeasurementDto) {
	console.log(id, createMeasurementDto)
	return this.sensorsService.addMeasurement(id, createMeasurementDto)
  }

  @Get()
  findAll() {
    return this.sensorsService.findAll()
  }
  
  @Post()
  create(@Body() createUserDto: CreateSensorDto) {
    console.log(createUserDto)
    return this.sensorsService.create(createUserDto)
  }

  @Get('/:id')
  read(@Param('id') id: string) {
    return this.sensorsService.read(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateSensorDto) {
    return this.sensorsService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorsService.delete(id)
  }
}
