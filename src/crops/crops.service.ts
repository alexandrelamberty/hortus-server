import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from './crops.entity';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
  ) {}

  async findAll(): Promise<Crop[]> {
    return this.cropRepository.find();
  }
}
