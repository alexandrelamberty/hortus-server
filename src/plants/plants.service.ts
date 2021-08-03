import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant, PlantDocument } from './schemas/plant.schema';

@Injectable()
export class PlantsService {
  constructor(
    @InjectModel(Plant.name)
    private readonly plantModel: Model<PlantDocument>,
  ) {}

  async create(
    createPlantDto: CreatePlantDto,
    photoPath: string,
  ): Promise<Plant> {
    const plant = new this.plantModel(createPlantDto);
    plant.image = photoPath;
    return plant.save();
  }

  async findAll(): Promise<Plant[]> {
    return await this.plantModel.find().populate('types').exec();
  }

  async findOne(id: string): Promise<Plant> {
    return await this.plantModel.findById(id).populate('types').exec();
  }

  async update(id: string, updatePlantDto: UpdatePlantDto) {
    return await this.plantModel.findByIdAndUpdate(id, updatePlantDto).exec();
  }

  async delete(id: string) {
    return await this.plantModel.findByIdAndDelete(id).exec();
    /*
    const result = await this.plantModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find Plant.');
    }*/
  }
}
