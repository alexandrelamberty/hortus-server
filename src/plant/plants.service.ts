import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { CreatePlantDto } from "./dto/create-plant.dto";
import { PlantsQueryParams } from "./dto/query-plants.dto";
import { UpdatePlantDto } from "./dto/update-plant.dto";
import { Plant } from "./schemas/plant.schema";
import { PlantsRepository } from "./plants.repository";

/**
 * This is a service class for interacting with a Plant model in a MongoDB
 * database. It provides several methods for querying and modifying plants in
 * the database.
 */
@Injectable()
export class PlantsService {
  /**
   * Creates an instance of PlantService.
   * @param model Mongoose model for Plant documents.
   */
  constructor(private readonly plantsRepository: PlantsRepository) {}

  /**
   * Retrieves a paginated list of all plants.
   * @param page Page number (defaults to 1).
   * @param limit Number of plants to retrieve per page (defaults to 10).
   * @returns List of plants.
   */
  async getAllPlants(query: PlantsQueryParams): Promise<Plant[]> {
    const plants = this.plantsRepository.getPlants(query);
    // const count = await this.plantModel.count();
    return plants;
  }

  /**
   * Retrieves a plant by its ID.
   * @param id ID of the plant to retrieve.
   * @returns Plant with the specified ID.
   */
  async getPlantById(id: Types.ObjectId): Promise<Plant> {
    const plant = await this.plantsRepository.getPlantById(id);
    return plant;
  }

  /**
   * Searches for plants by name using a regex search.
   * @param name Name of the plants to search for.
   * @returns List of plants with names that contain the specified string.
   */
  async getPlantByName(name: string): Promise<Plant> {
    const plant = await this.plantsRepository.getPlantByName(name);
    return plant;
  }

  /**
   * Creates a new plant.
   * @param plant Plant to create.
   * @returns Created plant.
   */
  async createPlant(dto: CreatePlantDto): Promise<Plant> {
    const plant = await this.plantsRepository.createPlant(dto);
    return plant;
  }

  /**
   * Updates an existing plant.
   * @param id ID of the plant to update.
   * @param plant Plant updates.
   * @returns Updated plant.
   */
  async updatePlant(id: Types.ObjectId, dto: UpdatePlantDto): Promise<Plant> {
    const plant = await this.plantsRepository.updatePlant(id, dto);
    return plant;
  }

  /**
   * Deletes a plant.
   * @param id ID of the plant to delete.
   * @returns Result of the delete operation.
   */
  async deletePlant(id: Types.ObjectId): Promise<Plant> {
    const plant = await this.plantsRepository.deletePlant(id);
    return plant;
  }
}
