import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreatePlantDto } from "../dto/create-plant.dto";
import { UpdatePlantDto } from "../dto/update-plant.dto";
import PlantNotFoundException from "../exceptions/plant.exceptions";
import { Plant, PlantDocument } from "../schemas/plant.schema";

/**
 * This is a service class for interacting with a Plant model in a MongoDB
 * database. It provides several methods for querying and modifying plants in
 * the database.
 */
@Injectable()
export class PlantService {
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
  async findAll(page = 1, limit = 10): Promise<Plant[]> {
    const skip = (page - 1) * limit;
    const query = this.model
      .find()
      .skip(parseInt(skip.toString()))
      .limit(parseInt(limit.toString()));
    const result = await query;
    // const count = await this.plantModel.count();
    return result;
  }

  /**
   * Retrieves a plant by its ID.
   * @param id ID of the plant to retrieve.
   * @returns Plant with the specified ID.
   */
  async findById(id: Types.ObjectId): Promise<Plant> {
    return await this.model.findById({ _id: id }).exec();
  }

  /**
   * Searches for plants by name using a regex search.
   * @param name Name of the plants to search for.
   * @returns List of plants with names that contain the specified string.
   */
  async findByName(name: string): Promise<Plant[]> {
    name.toLocaleLowerCase();
    const options = { name: { $regex: name } };
    return this.model.find(options).exec();
  }

  /**
   * Creates a new plant.
   * @param plant Plant to create.
   * @returns Created plant.
   */
  async create(plant: CreatePlantDto): Promise<Plant> {
    return this.model.create(plant as any);
  }

  /**
   * Updates an existing plant.
   * @param id ID of the plant to update.
   * @param plant Plant updates.
   * @returns Updated plant.
   */
  async update(id: Types.ObjectId, plant: UpdatePlantDto): Promise<Plant> {
    const result = await this.model
      .findByIdAndUpdate(id, plant, { new: true, runValidators: true })
      .exec();
    if (!result) throw new PlantNotFoundException(id);
    return result;
  }

  /**
   * Deletes a plant.
   * @param id ID of the plant to delete.
   * @returns Result of the delete operation.
   */
  async delete(
    id: Types.ObjectId
  ): Promise<{ ok?: number; n?: number; deletedCount?: number }> {
    const result = await this.model.deleteOne({ _id: id }).exec();
    if (!result) throw new PlantNotFoundException(id);
    return result;
  }
}
