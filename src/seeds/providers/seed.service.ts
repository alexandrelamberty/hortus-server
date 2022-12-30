import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateSeedDto } from "../dto/create-seed.dto";
import { UpdateSeedDto } from "../dto/update-seed.dto";
import SeedNotFoundException from "../exceptions/seed.exceptions";
import { Seed, SeedDocument } from "../schemas/seed.schema";

/**
 * This is a service class for interacting with a Seed model in a MongoDB
 * database. It provides several methods for querying and modifying seed in the
 * database.
 */
@Injectable()
export class SeedService {
  /**
   * Creates an instance of SeedService.
   * @param model Mongoose model for Seed documents.
   */
  constructor(
    @InjectModel(Seed.name)
    private readonly model: Model<SeedDocument>
  ) {}

  async findAllToSow(
    start: number,
    end: number,
    page = 1,
    limit?: number
  ): Promise<any> {
    const skip = (page - 1) * limit;
    const results = await this.model
      .find({
        "seeding.start": { $gte: Number(start), $lte: Number(end) },
      })
      .skip(parseInt(skip.toString()))
      .limit(parseInt(limit.toString()));

    const count = await this.model.countDocuments();
    return { results, count };
  }

  async findAll(page = 0, limit?: number): Promise<any> {
    const skip = (page - 1) * limit;
    const results = await this.model
      .find()
      .populate("plant")
      .populate("companions")
      .populate("competitors")
      .skip(parseInt(skip.toString()))
      .limit(parseInt(limit.toString()));
    const count = await this.model.countDocuments();
    return { results, count };
  }

  async findById(id: Types.ObjectId): Promise<Seed> {
    const result = await this.model.findById(id).populate("species").exec();
    if (!result) throw new SeedNotFoundException(id);
    return result;
  }

  async create(createSeedDto: CreateSeedDto): Promise<Seed> {
    let seed = await new this.model(createSeedDto).save();
    seed = await seed.populate("plant").execPopulate();
    return seed;
  }

  async update(id: Types.ObjectId, updateSeedDto: UpdateSeedDto) {
    let seed = await this.model.findByIdAndUpdate(id, updateSeedDto).exec();
    if (!Seed) throw new SeedNotFoundException(id);
    seed = await seed.populate("plant").execPopulate();
    return seed;
  }

  async deleteSeed(id: Types.ObjectId) {
    const result = await this.model.findByIdAndDelete(id).exec();
    if (!result) throw new SeedNotFoundException(id);
    return result;
  }
}
