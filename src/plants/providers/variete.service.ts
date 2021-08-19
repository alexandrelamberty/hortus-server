import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVarieteDto } from '../dto/variete/create-variete.dto';
import { UpdateVarieteDto } from '../dto/variete/update-variete.dto';
import { Variete, VarieteDocument } from '../schemas/variete.schema';

@Injectable()
export class VarieteService {
  constructor(
    @InjectModel(Variete.name)
    private readonly varieteModel: Model<VarieteDocument>,
  ) {}

  async create(createVarieteDto: CreateVarieteDto): Promise<Variete> {
    const plantVariete = new this.varieteModel(createVarieteDto);
    return plantVariete.save();
  }

  async findAll(): Promise<Variete[]> {
    return await this.varieteModel.find().exec();
  }

  async findOne(id: string): Promise<Variete> {
    return await this.varieteModel.findById(id).exec();
  }

  async update(id: string, updateVarieteDto: UpdateVarieteDto) {
    return await this.varieteModel
      .findByIdAndUpdate(id, updateVarieteDto)
      .exec();
  }

  async delete(id: string) {
    return await this.varieteModel.findByIdAndDelete(id).exec();
    /*
    const result = await this.plantModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find .');
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
