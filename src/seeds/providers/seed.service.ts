import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { PaginationParams } from '../../common/paginationParams'
import { CreateSeedDto } from '../dto/seed/create-seed.dto'
import { UpdateSeedDto } from '../dto/seed/update-seed.dto'
import SeedNotFoundException from '../exceptions/seedNotFound.exception'
import { Seed, SeedDocument } from '../schemas/seed.schema'

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name)

  constructor(
    @InjectModel(Seed.name)
    private readonly seedModel: Model<SeedDocument>
  ) {}

  async listSeeds(skip = 0, limit?: number): Promise<any> {
    const query = this.seedModel
      .find()
      .sort({ _id: 1 })
      .skip(parseInt(skip.toString()))

    if (limit) {
      query.limit(parseInt(limit.toString()))
    }
    const results = await query
    const count = await this.seedModel.count()
    return { results, count }
  }

  async createSeed(createSeedDto: CreateSeedDto): Promise<Seed> {
    const seed = new this.seedModel(createSeedDto)
    // FIXME: Handle error
    const result = await seed.save()
    return result
  }

  async readSeed(id: ObjectId): Promise<Seed> {
    const result = await this.seedModel.findById(id).populate('species').exec()
    if (!result) throw new SeedNotFoundException(id)
    return result
  }

  async updateSeed(id: ObjectId, updateSeedDto: UpdateSeedDto) {
    const result = await this.seedModel
      .findByIdAndUpdate(id, updateSeedDto)
      .exec()
    if (!result) throw new SeedNotFoundException(id)
    return result
  }

  async deleteSeed(id: ObjectId) {
    const result = await this.seedModel.findByIdAndDelete(id).exec()
    if (!result) throw new SeedNotFoundException(id)
    return result
  }
}
