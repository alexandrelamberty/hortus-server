import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCropDto } from '../dto/crop/create-crop.dto';
import { UpdateCropDto } from '../dto/crop/update-crop.dto';
import { Crop, CropDocument } from '../schemas/crop.schema';

@Injectable()
export class CropService {
  constructor(
    @InjectModel(Crop.name)
    private readonly cropModel: Model<CropDocument>,
  ) {}

  async create(
    createCropDto: CreateCropDto,
    photoPath: string,
  ): Promise<Crop> {
    const plant = new this.cropModel(createCropDto);
    plant.image = photoPath;
    return plant.save();
  }

  async findAll(): Promise<Crop[]> {
    return await this.cropModel.find().populate('types').exec();
  }

  async findOne(id: string): Promise<Crop> {
    return await this.cropModel.findById(id).populate('types').exec();
  }

  async update(id: string, updateCropDto: UpdateCropDto) {
    return await this.cropModel.findByIdAndUpdate(id, updateCropDto).exec();
  }

  async delete(id: string) {
    return await this.cropModel.findByIdAndDelete(id).exec();
    /*
    const result = await this.plantModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find Plant.');
    }*/
  }
}
