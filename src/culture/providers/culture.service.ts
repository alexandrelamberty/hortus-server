import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCultureDto } from '../dto/create-culture.dto';
import { UpdateCultureDto } from '../dto/update-culture.dto';
import { Culture, CultureDocument } from '../schemas/culture.schema';

@Injectable()
export class CultureService {
  constructor(
    @InjectModel(Culture.name)
    private readonly cultureModel: Model<CultureDocument>,
  ) {}

  async create(createCultureDto: CreateCultureDto): Promise<Culture> {
    const createdCrop = new this.cultureModel(createCultureDto);
    return createdCrop.save();
  }

  async findAll(): Promise<Culture[]> {
    return await this.cultureModel.find().populate('plant').exec();
  }

  async findOne(id: string): Promise<Culture> {
    return await this.cultureModel.findById(id).exec();
  }

  async update(id: string, updateCultureDto: UpdateCultureDto) {
    return await this.cultureModel.findByIdAndUpdate(id, updateCultureDto).exec();
  }

  async delete(id: string) {
    return await this.cultureModel.findByIdAndDelete(id).exec();
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
