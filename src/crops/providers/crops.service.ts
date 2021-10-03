import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { Crop, CropDocument } from '../schemas/crop.schema';

@Injectable()
export class CropsService {
  constructor(
    @InjectModel(Crop.name)
    private readonly cropModel: Model<CropDocument>,
  ) { }

  async create(createCropDto: CreateCropDto): Promise<Crop> {
    const createdCrop = new this.cropModel(createCropDto);
    return createdCrop.save();
  }

  async findAll(): Promise<Crop[]> {
    return await this.cropModel.find().populate('plant').exec();
  }

  async findOne(id: string): Promise<Crop> {
    return await this.cropModel.findById(id).exec();
  }

  async update(id: string, updateCropDto: UpdateCropDto) {
    return await this.cropModel.findByIdAndUpdate(id, updateCropDto).exec();
  }

  async delete(id: string) {
    return await this.cropModel.findByIdAndDelete(id).exec();
  }
}
