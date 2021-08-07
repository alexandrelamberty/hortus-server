import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlantFamilyDto } from '../dto/create-plant-family.dto';
import { UpdatePlantFamilyDto } from '../dto/update-plant-family.dto';
import { PlantFamily, PlantFamilyDocument } from '../schemas/plant-family.schema';

@Injectable()
export class PlantFamilyService {
  constructor(
    @InjectModel(PlantFamily.name)
    private readonly plantFamilyModel: Model<PlantFamilyDocument>,
  ) {}

  async create(
    createPlantFamilyDto: CreatePlantFamilyDto,
  ): Promise<PlantFamily> {
    const plant = new this.plantFamilyModel(createPlantFamilyDto);
    return plant.save();
  }

  async findAll(): Promise<PlantFamily[]> {
    return await this.plantFamilyModel.find().exec();
  }

  async findOne(id: string): Promise<PlantFamily> {
    return await this.plantFamilyModel.findById(id).exec();
  }

  async update(id: string, updatePlantFamilyDto: UpdatePlantFamilyDto) {
    return await this.plantFamilyModel
      .findByIdAndUpdate(id, updatePlantFamilyDto)
      .exec();
  }

  async delete(id: string) {
    return await this.plantFamilyModel.findByIdAndDelete(id).exec();
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
