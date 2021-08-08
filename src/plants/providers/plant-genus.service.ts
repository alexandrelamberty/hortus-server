import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlantGenusDto } from '../dto/create-plant-genus.dto';
import { UpdatePlantGenusDto } from '../dto/update-plant-genus.dto';
import { PlantGenus, PlantGenusDocument } from '../schemas/plant-genus.schema';

@Injectable()
export class PlantGenusService {
  constructor(
    @InjectModel(PlantGenus.name)
    private readonly plantGenusModel: Model<PlantGenusDocument>,
  ) {}

  async create(createPlantGenusDto: CreatePlantGenusDto): Promise<PlantGenus> {
    const plant = new this.plantGenusModel(createPlantGenusDto);
    return plant.save();
  }

  async findAll(): Promise<PlantGenus[]> {
    return await this.plantGenusModel.find().exec();
  }

  async findOne(id: string): Promise<PlantGenus> {
    return await this.plantGenusModel.findById(id).exec();
  }

  async update(id: string, updatePlantGenusDto: UpdatePlantGenusDto) {
    return await this.plantGenusModel
      .findByIdAndUpdate(id, updatePlantGenusDto)
      .exec();
  }

  async delete(id: string) {
    return await this.plantGenusModel.findByIdAndDelete(id).exec();
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
