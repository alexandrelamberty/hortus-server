import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { PaginationParams } from 'src/common/paginationParams';
import { CreateCultureDto } from '../dto/create-culture.dto';
import { UpdateCultureDto } from '../dto/update-culture.dto';
import CultureNotFoundException from '../exceptions/cultureNotFound.exception';
import { Culture, CultureDocument } from '../schemas/culture.schema';

@Injectable()
export class CultureService {
  constructor(
    @InjectModel(Culture.name)
    private readonly model: Model<CultureDocument>,
  ) {}

  async listCultures(skip = 0, limit?: number): Promise<any> {
    const query = this.model
      .find()
      .sort({ _id: 1 })
      .skip(parseInt(skip.toString()))

    if (limit) {
      query.limit(parseInt(limit.toString()))
    }
    const results = await query
    const count = await this.model.count()
    return { results, count }
  }

  async createCulture(createCultureDto: CreateCultureDto): Promise<Culture> {
    const createdCrop = new this.model(createCultureDto);
    return createdCrop.save();
  }

  async readCulture(id: ObjectId): Promise<Culture> {
    const result = await this.model.findById(id).exec();
    if (!result) throw new CultureNotFoundException(id)
    return result
  }

  async updateCulture(id: ObjectId, updateCultureDto: UpdateCultureDto) {
    const result =  await this.model.findByIdAndUpdate(id, updateCultureDto).exec();
    if (!result) throw new CultureNotFoundException(id)
    return result
  }

  async deleteCulture(id: ObjectId) {
    const result =  await this.model.findByIdAndDelete(id).exec();
    if (!result) throw new CultureNotFoundException(id)
    return result
  }
}
