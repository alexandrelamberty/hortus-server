import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSpeciesDto } from '../dto/species/create-species.dto';
import { UpdateSpeciesDto } from '../dto/species/update-species.dto';
import { Species, SpeciesDocument } from '../schemas/species.schema';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectModel(Species.name)
    private readonly varieteModel: Model<SpeciesDocument>,
  ) { }

  async create(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    const plantSpecies = new this.varieteModel(createSpeciesDto);
    return plantSpecies.save();
  }

  async findAll(): Promise<Species[]> {
    return await this.varieteModel.find().exec();
  }

  async findOne(id: string): Promise<Species> {
    return await this.varieteModel.findById(id).exec();
  }

  async update(id: string, updateSpeciesDto: UpdateSpeciesDto) {
    return await this.varieteModel
      .findByIdAndUpdate(id, updateSpeciesDto)
      .exec();
  }

  async delete(id: string) {
    return await this.varieteModel.findByIdAndDelete(id).exec();
  }
}
