import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePlantDto } from "../dto/create-plant.dto";
import { UpdatePlantDto } from "../dto/update-plant.dto";
import { Plant, PlantDocument } from "../schemas/plant.schema";

@Injectable()
export class PlantService {
  constructor(
    @InjectModel(Plant.name)
    private readonly plantModel: Model<PlantDocument>
  ) {}

  async getAll(
    skip = 0,
    limit?: number
  ): Promise<{ plants: Plant[]; count: number }> {
    const query = this.plantModel.find().skip(parseInt(skip.toString()));
    if (limit) {
      query.limit(parseInt(limit.toString()));
    }
    const result = await query;
    const count = await this.plantModel.count();
    return { plants: result, count: count };
  }

  getById(id: string): Promise<Plant> {
    return this.plantModel.findById(id).exec();
  }

  insert(plant: CreatePlantDto): Promise<Plant> {
    return this.plantModel.create(plant as any);
  }

  update(id: string, plant: UpdatePlantDto): Promise<Plant> {
    return this.plantModel.findByIdAndUpdate(id, plant).exec();
  }

  delete(id: string): Promise<any> {
    return this.plantModel.remove({ id }).exec();
  }
}
