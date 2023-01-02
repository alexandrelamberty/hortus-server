import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { Model } from "mongoose";
import { CreatePlantDto } from "./dto/create-plant.dto";
import { UpdatePlantDto } from "./dto/update-plant.dto";
import { Plant, PlantDocument } from "./schemas/plant.schema";
import PlantNotFoundException from "./exceptions/plant.exceptions";
import { PlantsQueryParams } from "./dto/plant-query.dto";

/**
 * This is a service class for interacting with a Plant model in a MongoDB
 * database. It provides several methods for querying and modifying plants in
 * the database.
 */
@Injectable()
export class PlantsRepository {
  constructor(
    @InjectModel(Plant.name)
    private readonly model: Model<PlantDocument>
  ) {}

  async getPlants(query: PlantsQueryParams): Promise<PlantDocument[]> {
    const skip = (query.page - 1) * query.limit;
    const results = await this.model
      .find(
        {
          title: { $regex: "nest" },
          // title: { $regex: String(query.title) },
          // status: String(query.status),
        },
        { new: true, runValidators: true }
      )
      .skip(parseInt(skip.toString()))
      .limit(parseInt(query.limit.toString()))
      .exec();
    // const count = await this.model.count();
    return results;
  }

  async getPlantById(id: ObjectId): Promise<PlantDocument> {
    const result = await this.model.findOne({ _id: id }).exec();
    return result;
  }

  async getPlantByName(name: string): Promise<PlantDocument> {
    const result = await this.model.findOne({ name: name }).exec();
    return result;
  }

  async createPlant(dto: CreatePlantDto): Promise<PlantDocument> {
    const plant = await this.model.create(dto);
    return plant;
  }

  async updatePlant(id: ObjectId, dto: UpdatePlantDto): Promise<PlantDocument> {
    const plant = await this.model
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .exec();
    if (!plant) throw new PlantNotFoundException(id);
    return plant;
  }

  async deletePlant(id: ObjectId): Promise<PlantDocument> {
    const result = await this.model.findByIdAndDelete(id).exec();
    if (!result) throw new PlantNotFoundException(id);
    return result;
  }
}
