import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCropDto } from './dto/create-crop.dto';
import { Crop, CropDocument } from './schemas/crop.schema';


@Injectable()
export class CropsService {
  constructor(
    @InjectModel(Crop.name)
    private readonly cropModel: Model<CropDocument>,
  ) {}

  async create(createCropDto: CreateCropDto): Promise<Crop> {
    const createdCrop = new this.cropModel(createCropDto);
    return createdCrop.save();
  }

  async findAll(): Promise<Crop[]> {
    return this.cropModel.find().exec();
  }
}
