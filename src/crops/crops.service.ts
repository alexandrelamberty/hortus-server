import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
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
    return await this.cropModel.find().exec();
  }

  async findOne(id: string): Promise<Crop> {
    return await this.cropModel.findById(id).exec();
  }

  async update(id: string, updateCropDto: UpdateCropDto) {
    return await this.cropModel.findByIdAndUpdate(id, updateCropDto).exec();
  }

  async delete(id: string) {
    return await this.cropModel.findByIdAndDelete(id).exec();
    /*
    const result = await this.cropModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find Crop.');
    }*/
  }
  /*
  private async findById(id: number): Promise<Crop> {
    let crop: any;
    try {
      crop = await this.cropModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Crop.');
    }
    if (!crop) {
      throw new NotFoundException('Could not find Crop.');
    }
    return crop;
  }*/
}
