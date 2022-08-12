import {
  Injectable
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId, Types } from 'mongoose'
import { CreatePlantDto } from '../dto/create-plant.dto'
import { UpdatePlantDto } from '../dto/update-plant.dto'
import PlantNotFoundException from '../exceptions/plantNotFound.exception'

import { Plant, PlantDocument } from '../schemas/plant.schema'

@Injectable()
export class PlantService {
  constructor(
    @InjectModel(Plant.name)
    private readonly plantModel: Model<PlantDocument>
  ) { }

  async listPlants(skip = 0, limit?: number): Promise<any> {
    const query = this.plantModel
      .find()
      .sort({ _id: 1 })
      .skip(parseInt(skip.toString()))

    if (limit) {
      query.limit(parseInt(limit.toString()))
    }
    const results = await query
    const count = await this.plantModel.count()
    return { results, count }
  }

  async createPlant(createPlantDto: CreatePlantDto): Promise<Plant> {
    console.log(createPlantDto)
    const plantPlant = new this.plantModel(createPlantDto)
    return await plantPlant.save()
  }

  async readPlant(id: Types.ObjectId): Promise<Plant> {
    const result = await this.plantModel.findById(id).exec()
    if (!result) throw new PlantNotFoundException(id)
    return result
  }

  async updatePlant(id: Types.ObjectId, updatePlantDto: UpdatePlantDto) {
    const result = await this.plantModel
      .findByIdAndUpdate(id, updatePlantDto)
      .exec()
    if (!result) throw new PlantNotFoundException(id)
    return result
  }

  async deletePlant(id: Types.ObjectId) {
    const result = await this.plantModel.findByIdAndDelete(id).exec()
    if (!result) throw new PlantNotFoundException(id)
    return result
  }
}
