import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateMeasurementDto } from './dto/create-measurement.dto'
import { CreateSensorDto } from './dto/create-sensor.dto'
import { UpdateSensorDto } from './dto/update-sensor.dto'
import { Sensor, SensorDocument } from './schemas/sensor.schema'

@Injectable()
export class SensorsService {
  constructor(
    @InjectModel(Sensor.name)
    private readonly sensorModel: Model<SensorDocument>
  ) {}

  async findAll(skip = 0, limit?: number): Promise<any> {
    const query = this.sensorModel
      .find()
      .sort({ _id: 1 })
      .skip(parseInt(skip.toString()))

    if (limit) {
      query.limit(parseInt(limit.toString()))
    }
    const results = await query
    const count = await this.sensorModel.count()
    return { results, count }
  }

  async findByIp(ip: string): Promise<Sensor> {
    const sensor = await this.sensorModel.findOne({ ip: ip }).exec()
    if (sensor) {
      return sensor
    }
    throw new HttpException(
      'Sensor with this ip does not exist',
      HttpStatus.NOT_FOUND
    )
  }

  async findByMacAddress(mac: string): Promise<Sensor> {
    const sensor = await this.sensorModel.findOne({ macaddress: mac }).exec()
    if (sensor) {
      return sensor
    }
    throw new HttpException(
      'Sensor with this mac-address does not exist',
      HttpStatus.NOT_FOUND
    )
  }

  async addMeasurement(id: string, createMeasurementDto: CreateMeasurementDto): Promise<Sensor> {
    const sensor = await this.sensorModel.findById(id).exec()
	if(!sensor)
	{
	  throw new HttpException(
		'Sensor with this mac-address does not exist',
		HttpStatus.NOT_FOUND
	  )
	}
	sensor.measurements.push(createMeasurementDto)
	sensor.save()
	return sensor
  }

  async create(createSensorDto: CreateSensorDto): Promise<Sensor> {
    const sensor = new this.sensorModel(createSensorDto)
    return sensor.save()
  }

  async read(id:string): Promise<Sensor> {
    const sensor = await this.sensorModel.findById(id).exec()
    if (sensor) {
      return sensor
    }
    throw new HttpException(
      'Sensor with this mac-address does not exist',
      HttpStatus.NOT_FOUND
    )
  }

  async update(id: string, updateSensorDto: UpdateSensorDto) {
    return await this.sensorModel.findByIdAndUpdate(id, updateSensorDto).exec()
  }

  async delete(id: string) {
    return await this.sensorModel.findByIdAndDelete(id).exec()
  }
}
