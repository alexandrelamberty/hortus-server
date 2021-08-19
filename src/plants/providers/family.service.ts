import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFamilyDto } from '../dto/family/create-family.dto';
import { UpdateFamilyDto } from '../dto/family/update-family.dto';
import { Family, FamilyDocument } from '../schemas/family.schema';

@Injectable()
export class FamilyService {
  constructor(
    @InjectModel(Family.name)
    private readonly familyModel: Model<FamilyDocument>,
  ) {}

  async create(createFamilyDto: CreateFamilyDto): Promise<Family> {
    const plant = new this.familyModel(createFamilyDto);
    return plant.save();
  }

  async findAll(): Promise<Family[]> {
    return await this.familyModel.find().exec();
  }

  async findOne(id: string): Promise<Family> {
    return await this.familyModel.findById(id).exec();
  }

  async update(id: string, updatePFamilyDto: UpdateFamilyDto) {
    return await this.familyModel
      .findByIdAndUpdate(id, updatePFamilyDto)
      .exec();
  }

  async delete(id: string) {
    return await this.familyModel.findByIdAndDelete(id).exec();
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
