import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlantTypeDto } from '../dto/create-plant-type.dto';
import { UpdatePlantTypeDto } from '../dto/update-plant-type.dto';
import { PlantType, PlantTypeDocument } from '../schemas/plant-type.schema';

@Injectable()
export class PlantTypeService {
  constructor(
    @InjectModel(PlantType.name)
    private readonly plantTypeModel: Model<PlantTypeDocument>,
  ) {}

  async create(createPlantTypeDto: CreatePlantTypeDto): Promise<PlantType> {
    const plantType = new this.plantTypeModel(createPlantTypeDto);
    return plantType.save();
  }

  async findAll(): Promise<PlantType[]> {
    return await this.plantTypeModel.find().exec();
  }

  async findOne(id: string): Promise<PlantType> {
    return await this.plantTypeModel.findById(id).exec();
  }

  async update(id: string, updatePlantTypeDto: UpdatePlantTypeDto) {
    return await this.plantTypeModel
      .findByIdAndUpdate(id, updatePlantTypeDto)
      .exec();
  }

  async delete(id: string) {
    return await this.plantTypeModel.findByIdAndDelete(id).exec();
    /*
    const result = await this.plantModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find Plant.');
    }*/
  }
  /*
  private async findById(id: number): Promise<Plant> {
    let plant: any;
    try {
      plant = await this.plantModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Plant.');
    }
    if (!plant) {
      throw new NotFoundException('Could not find Plant.');
    }
    return plant;
  }*/
}
