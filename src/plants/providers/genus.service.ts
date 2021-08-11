import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGenusDto } from '../dto/genus/create-genus.dto';
import { UpdateGenusDto } from '../dto/genus/update-genus.dto';
import { Genus, GenusDocument } from '../schemas/genus.schema';

@Injectable()
export class GenusService {
  constructor(
    @InjectModel(Genus.name)
    private readonly genusModel: Model<GenusDocument>,
  ) {}

  async create(createGenusDto: CreateGenusDto): Promise<Genus> {
    const plant = new this.genusModel(createGenusDto);
    return plant.save();
  }

  async findAll(): Promise<Genus[]> {
    return await this.genusModel.find().exec();
  }

  async findOne(id: string): Promise<Genus> {
    return await this.genusModel.findById(id).exec();
  }

  async update(id: string, updateGenusDto: UpdateGenusDto) {
    return await this.genusModel.findByIdAndUpdate(id, updateGenusDto).exec();
  }

  async delete(id: string) {
    return await this.genusModel.findByIdAndDelete(id).exec();
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
