import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { CreatePlantDto } from "./dto/create-plant.dto";
import { QueryPlantParams } from "./dto/query-plant.dto";
import { UpdatePlantDto } from "./dto/update-plant.dto";
import { PlantsRepository } from "./plants.repository";
import { Plant } from "./schemas/plant.schema";

@Injectable()
export class PlantsService {
  constructor(private readonly plantsRepository: PlantsRepository) {}

  async getAllPlants(
    query: QueryPlantParams
  ): Promise<{ plants: Plant[]; count: number }> {
    const results = await this.plantsRepository.getAllPlants(
      query.page,
      query.limit
    );
    return results;
  }

  async getPlantById(id: Types.ObjectId): Promise<Plant> {
    const plant = await this.plantsRepository.getPlantById(id);
    return plant;
  }

  async getPlantByName(name: string): Promise<Plant> {
    const plant = await this.plantsRepository.getPlantByName(name);
    return plant;
  }

  async createPlant(dto: CreatePlantDto): Promise<Plant> {
    const plant = await this.plantsRepository.createPlant(dto);
    return plant;
  }

  async updatePlant(id: Types.ObjectId, dto: UpdatePlantDto): Promise<Plant> {
    const plant = await this.plantsRepository.updatePlant(id, dto);
    return plant;
  }

  async deletePlant(id: Types.ObjectId): Promise<Plant> {
    const plant = await this.plantsRepository.deletePlant(id);
    return plant;
  }
}
