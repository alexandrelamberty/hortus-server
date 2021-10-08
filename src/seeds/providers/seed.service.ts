import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSeedDto } from '../dto/seed/create-seed.dto';
import { UpdateSeedDto } from '../dto/seed/update-seed.dto';
import { Seed, SeedDocument } from '../schemas/seed.schema';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Seed.name)
    private readonly seedModel: Model<SeedDocument>,
  ) {}

  async create(
    createSeedDto: CreateSeedDto,
    photoPath: string,
  ): Promise<Seed> {
    const seed = new this.seedModel(createSeedDto);
    seed.image = photoPath;
    return seed.save();
  }

  async findAll(): Promise<Seed[]> {
    return await this.seedModel.find().populate('types').exec();
  }

  async findOne(id: string): Promise<Seed> {
    return await this.seedModel.findById(id).populate('types').exec();
  }

  async update(id: string, updateSeedDto: UpdateSeedDto) {
    return await this.seedModel.findByIdAndUpdate(id, updateSeedDto).exec();
  }

  async delete(id: string) {
    return await this.seedModel.findByIdAndDelete(id).exec();
    /*
    const result = await this.seedModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find Seed.');
    }*/
  }
}
