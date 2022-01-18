import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { Sensor, SensorDocument } from './schemas/sensor.schema';
import find from 'local-devices'

@Injectable()
export class SensorsService {
  constructor(
    @InjectModel(Sensor.name)
    private readonly userModel: Model<SensorDocument>,
  ) {}

  async findAll(): Promise<Sensor[]> {
    //return await this.userModel.find().exec();
    const find = require('local-devices')
    return await find().then((devices) => {
	  return devices
    })
  }

  async findOne(username: string): Promise<Sensor> {
    const user = await this.userModel.findOne({ username: username }).exec();
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this username does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async findById(id: string): Promise<Sensor> {
    const user = await this.userModel.findOne({ id: id }).exec();
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async findByUsername(username: string): Promise<Sensor> {
    const user = await this.userModel.findOne({ username: username }).exec();
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this username does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async findByEmail(email: string): Promise<Sensor> {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(createUserDto: CreateSensorDto): Promise<Sensor> {
    const plant = new this.userModel(createUserDto);
    return plant.save();
  }

  async update(id: string, updateUserDto: UpdateSensorDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
