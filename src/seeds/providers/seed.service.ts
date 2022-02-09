import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { CreateSeedDto } from '../dto/seed/create-seed.dto'
import { UpdateSeedDto } from '../dto/seed/update-seed.dto'
import SeedNotFoundException from '../exceptions/seedNotFound.exception'
import { Seed, SeedDocument } from '../schemas/seed.schema'

@Injectable()
export class SeedService {

	private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Seed.name)
    private readonly seedModel: Model<SeedDocument>
  ) {}

  async findAll(): Promise<Seed[]> {
		this.logger.log('findAll');
    return await this.seedModel
      .find()
      .populate('companions')
      .populate('species')
      .populate('types')
      .exec()
  }

  async create(createSeedDto: CreateSeedDto, photoPath: string): Promise<Seed> {
		this.logger.log('create', createSeedDto);
    const seed = new this.seedModel(createSeedDto)
    seed.image = photoPath
    const result = await seed.save()
    return result
  }

  async read(id: ObjectId): Promise<Seed> {
    const result = await this.seedModel.findById(id).populate('species').exec()
    if (!result) throw new SeedNotFoundException(id)
    return result
  }

  async update(id: ObjectId, updateSeedDto: UpdateSeedDto) {
    const result = await this.seedModel
      .findByIdAndUpdate(id, updateSeedDto)
      .exec()
    if (!result) throw new SeedNotFoundException(id)
    return result
  }

  async delete(id: ObjectId) {
    const result = await this.seedModel.findByIdAndDelete(id).exec()
    if (!result) throw new SeedNotFoundException(id)
    return result
  }
}
