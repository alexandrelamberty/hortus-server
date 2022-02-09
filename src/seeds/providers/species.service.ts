import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import SpeciesNotFoundException from 'src/seeds/exceptions/speciesNotFound.exception'
import { InjectModel } from '@nestjs/mongoose'
import { throws } from 'assert'
import { Model, ObjectId } from 'mongoose'
import { CreateSpeciesDto } from '../dto/species/create-species.dto'
import { UpdateSpeciesDto } from '../dto/species/update-species.dto'
import { Species, SpeciesDocument } from '../schemas/species.schema'

@Injectable()
export class SpeciesService {
  constructor(
    @InjectModel(Species.name)
    private readonly speciesModel: Model<SpeciesDocument>
  ) {}

  async findAll(offset: number = 0, limit?: number): Promise<any> {
    const query = this.speciesModel
      .find()
      .sort({ _id: 1 })
      .skip(parseInt(offset.toString()))

    if (limit) {
      query.limit(parseInt(limit.toString()))
    }
    const results = await query
    const count = await this.speciesModel.count()
    return { results, count }
  }

  async create(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    const plantSpecies = new this.speciesModel(createSpeciesDto)
    return await plantSpecies.save()
  }

  async read(id: ObjectId): Promise<Species> {
    const result = await this.speciesModel.findById(id).exec()
    if (!result) throw new SpeciesNotFoundException(id)
    return result
  }

  async update(id: ObjectId, updateSpeciesDto: UpdateSpeciesDto) {
    const result = await this.speciesModel
      .findByIdAndUpdate(id, updateSpeciesDto)
      .exec()
    if (!result) throw new SpeciesNotFoundException(id)
    return result
  }

  async delete(id: ObjectId) {
    const result = await this.speciesModel.findByIdAndDelete(id).exec()
    if (!result) throw new SpeciesNotFoundException(id)
    return result
  }
}
