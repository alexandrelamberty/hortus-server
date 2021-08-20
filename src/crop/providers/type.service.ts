import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTypeDto } from '../dto/type/create-type.dto';
import { UpdateTypeDto } from '../dto/type/update-type.dto';
import { Type, TypeDocument } from '../schemas/type.schema';

@Injectable()
export class TypeService {
  constructor(
    @InjectModel(Type.name)
    private readonly plantTypeModel: Model<TypeDocument>,
  ) {}

  async create(createTypeDto: CreateTypeDto): Promise<Type> {
    const plantType = new this.plantTypeModel(createTypeDto);
    return plantType.save();
  }

  async findAll(): Promise<Type[]> {
    return await this.plantTypeModel.find().exec();
  }

  async findOne(id: string): Promise<Type> {
    return await this.plantTypeModel.findById(id).exec();
  }

  async update(id: string, updateTypeDto: UpdateTypeDto) {
    return await this.plantTypeModel
      .findByIdAndUpdate(id, updateTypeDto)
      .exec();
  }

  async delete(id: string) {
    return await this.plantTypeModel.findByIdAndDelete(id).exec();
    /*
    const result = await this.plantModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find .');
    }*/
  }
  /*
  private async findById(id: number): Promise<> {
    let plant: any;
    try {
      plant = await this.plantModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find .');
    }
    if (!plant) {
      throw new NotFoundException('Could not find .');
    }
    return plant;
  }*/
}
