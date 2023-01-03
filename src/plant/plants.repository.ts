import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { Model } from "mongoose";
import { CreatePlantDto } from "./dto/create-plant.dto";
import { UpdatePlantDto } from "./dto/update-plant.dto";
import PlantNotFoundException from "./exceptions/plant.exceptions";
import { Plant, PlantDocument } from "./schemas/plant.schema";

/**
 * This is a repository class for interacting with a Plant model in a MongoDB
 * database. It provides several methods for querying and modifying plants in
 * the database.
 */
@Injectable()
export class PlantsRepository {
  /**
   * Creates an instance of PlantService.
   * @param model Mongoose model for Plant documents.
   */
  constructor(
    @InjectModel(Plant.name)
    private readonly model: Model<PlantDocument>
  ) {}

  /**
   * Retrieves a paginated list of all plants.
   * @param page Page number (defaults to 1).
   * @param limit Number of plants to retrieve per page (defaults to 10).
   * @returns List of plants.
   */
  async getAllPlants(page = 1, limit = 20): Promise<any> {
    const skip = (page - 1) * limit;
    const results = await this.model
      .find()
      .skip(Number(skip))
      .limit(Number(limit))
      .exec();
    const count = await this.model.countDocuments();
    return { results, count };
  }

  /**
   * Retrieves a plant by its ID.
   * @param id ID of the plant to retrieve.
   * @returns Plant with the specified ID.
   */
  async getPlantById(id: ObjectId): Promise<PlantDocument> {
    const result = await this.model.findOne({ _id: id }).exec();
    return result;
  }

  /**
   * Searches for plants by name using a regex search.
   * @param name Name of the plants to search for.
   * @returns List of plants with names that contain the specified string.
   */
  async getPlantByName(name: string): Promise<PlantDocument> {
    const result = await this.model.findOne({ name: name }).exec();
    return result;
  }

  /**
   * Creates a new plant.
   * @param plant Plant to create.
   * @returns Created plant.
   */
  async createPlant(dto: CreatePlantDto): Promise<PlantDocument> {
    const plant = await this.model.create(dto);
    return plant;
  }

  /**
   * Updates an existing plant.
   * @param id ID of the plant to update.
   * @param plant Plant updates.
   * @returns Updated plant.
   */
  async updatePlant(id: ObjectId, dto: UpdatePlantDto): Promise<PlantDocument> {
    const plant = await this.model
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .exec();
    if (!plant) throw new PlantNotFoundException(id);
    return plant;
  }

  /**
   * Deletes a plant.
   * @param id ID of the plant to delete.
   * @returns Result of the delete operation.
   */
  async deletePlant(id: ObjectId): Promise<PlantDocument> {
    const result = await this.model.findByIdAndDelete(id).exec();
    if (!result) throw new PlantNotFoundException(id);
    return result;
  }
}
