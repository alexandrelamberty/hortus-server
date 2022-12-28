import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { CreateSeedDto } from "../dto/create-seed.dto";
import { UpdateSeedDto } from "../dto/update-seed.dto";
import SeedNotFoundException from "../exceptions/seed.exceptions";
import { Seed, SeedDocument } from "../schemas/seed.schema";

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Seed.name)
    private readonly seedModel: Model<SeedDocument>
  ) {}

  async listSeedsToSow(skip = 0, limit?: number): Promise<any> {
    const query = this.seedModel
      .find()
      .sort({ _id: 1 })
      .skip(parseInt(skip.toString()));

    if (limit) {
      query.limit(parseInt(limit.toString()));
    }
    const results = await query;
    const count = await this.seedModel.count();
    return { results, count };
  }

  async listSeeds(skip = 0, limit?: number): Promise<any> {
    const query = this.seedModel
      .find()
      .populate("competitors")
      .populate("companions")
      .populate("plant")
      .sort({ _id: 1 })
      .skip(parseInt(skip.toString()));

    if (limit) {
      query.limit(parseInt(limit.toString()));
    }
    const results = await query;
    const count = await this.seedModel.count();
    return { results, count };
  }

  async createSeed(createSeedDto: CreateSeedDto): Promise<Seed> {
    let seed = await new this.seedModel(createSeedDto).save();
    seed = await seed.populate("plant").execPopulate();
    return seed;
  }

  async readSeed(id: Types.ObjectId): Promise<Seed> {
    const result = await this.seedModel.findById(id).populate("species").exec();
    if (!result) throw new SeedNotFoundException(id);
    return result;
  }

  async updateSeed(id: Types.ObjectId, updateSeedDto: UpdateSeedDto) {
    let seed = await this.seedModel.findByIdAndUpdate(id, updateSeedDto).exec();
    if (!Seed) throw new SeedNotFoundException(id);
    seed = await seed.populate("plant").execPopulate();
    return seed;
  }

  async deleteSeed(id: Types.ObjectId) {
    const result = await this.seedModel.findByIdAndDelete(id).exec();
    if (!result) throw new SeedNotFoundException(id);
    return result;
  }
}
