import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { CreateCultureDto } from "../dto/create-culture.dto";
import { UpdateCultureDto } from "../dto/update-culture.dto";
import CultureNotFoundException from "../exceptions/cultures.exceptions";
import { Culture, CultureDocument } from "../schemas/culture.schema";

@Injectable()
export class CultureService {
  constructor(
    @InjectModel(Culture.name)
    private readonly model: Model<CultureDocument>
  ) {}

  async listCultures(skip = 0, limit?: number): Promise<any> {
    const query = this.model
      .find()
      .sort({ _id: 1 })
      .populate("seed")
      .skip(parseInt(skip.toString()));

    if (limit) {
      query.limit(parseInt(limit.toString()));
    }
    const results = await query;
    const count = await this.model.count();
    return { results, count };
  }

  async createCulture(createCultureDto: CreateCultureDto): Promise<Culture> {
    let culture = await new this.model(createCultureDto).save();
    culture = await culture.populate("seed").execPopulate();
    return culture;
  }

  async readCulture(id: Types.ObjectId): Promise<Culture> {
    const result = await this.model.findById(id).exec();
    if (!result) throw new CultureNotFoundException(id);
    return result;
  }

  async updateCulture(id: Types.ObjectId, updateCultureDto: UpdateCultureDto) {
    let culture = await this.model
      .findByIdAndUpdate(id, updateCultureDto)
      .exec();
    if (!culture) throw new CultureNotFoundException(id);
    culture = await culture.populate("seed").execPopulate();
    return culture;
  }

  async deleteCulture(id: Types.ObjectId) {
    const result = await this.model.findByIdAndDelete(id).exec();
    if (!result) throw new CultureNotFoundException(id);
    return result;
  }
}
