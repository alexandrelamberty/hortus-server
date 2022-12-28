import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Types } from "mongoose";

import { PaginationParams } from "@common/paginationParams";
import { ParseObjectIdPipe } from "@common/pipe/ParseObjectIdPipe";
import { SharpPipe } from "@common/pipe/SharpPipe";

import { CreatePlantDto } from "../dto/create-plant.dto";
import { UpdatePlantDto } from "../dto/update-plant.dto";
import PlantNotFoundException from "../exceptions/plant.exceptions";
import { PlantService } from "../providers/plant.service";
import { Plant } from "../schemas/plant.schema";
import { PlantDeleteResponse } from "@plant/responses/plants.responses";

/**
 * Controller class for managing plants.
 */
@Controller("/plants")
export class PlantController {
  /**
   * Creates an instance of PlantController.
   * @param plantService Service for managing plants.
   */
  constructor(private readonly plantService: PlantService) {}

  /**
   * Retrieves a paginated list of all plants.
   * @param paginationParams Query parameters for pagination.
   * @returns List of plants.
   */
  @Get()
  async findAll(@Query() { page, limit }: PaginationParams): Promise<Plant[]> {
    return this.plantService.findAll(page, limit);
  }

  /**
   * Searches for plants by name using a regex search.
   * @param name Name of the plants to search for.
   * @returns List of plants with names that contain the specified string.
   */
  @Get("/find")
  async searchByName(@Query("name") name: string): Promise<Plant[]> {
    Logger.log(name);
    return this.plantService.searchByName(name);
  }

  /**
   * Retrieves a plant by its ID.
   * @param id ID of the plant to retrieve.
   * @returns Plant with the specified ID.
   * @throws {PlantNotFoundException} If the plant with the specified ID is not found.
   */
  @Get("/:id")
  async getById(@Param("id", ParseObjectIdPipe) id: string): Promise<Plant> {
    try {
      return await this.plantService.findById(id);
    } catch (err) {
      throw new PlantNotFoundException(id);
    }
  }

  /**
   * Creates a new plant.
   * @param plant Plant to create.
   * @param file Image file for the plant.
   * @returns Created plant.
   * @throws {BadRequestException} If no image file is provided in the request.
   */
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async insert(
    @Body() plant: CreatePlantDto,
    @UploadedFile(SharpPipe) file: string
  ): Promise<Plant> {
    if (!file) {
      throw new BadRequestException(
        "bad request",
        "no field name file of type File provided in the request"
      );
    } else {
      plant.image = file;
    }
    return this.plantService.create(plant);
  }

  /**
   * Updates an existing plant.
   * @param id ID of the plant to update.
   * @param plant Plant updates.
   * @param file Image file for the plant.
   * @returns Updated plant.
   * @throws {PlantNotFoundException} If the plant with the specified ID is not found.
   */
  @Put(":id")
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() plant: UpdatePlantDto,
    @UploadedFile(SharpPipe) file: string
  ): Promise<Plant> {
    if (file) {
      plant.image = file;
    }
    try {
      return this.plantService.update(id, plant);
    } catch (err) {
      // delete file
      throw new PlantNotFoundException(id);
    }
  }

  /**
   * Deletes a single plant by its ID.
   * @param id - ID of the plant to delete.
   * @returns - A PlantDeleteResponse object indicating whether the delete was successful.
   * @throws PlantNotFoundException if a plant with the specified ID could not be found.
   */
  @Delete(":id")
  async delete(
    @Param("id", ParseObjectIdPipe) id: string
  ): Promise<PlantDeleteResponse> {
    try {
      return this.plantService.delete(id);
    } catch (err) {
      throw new PlantNotFoundException(id);
    }
  }

  /**
   * Deletes multiple plants by their IDs.
   * @param ids - Array of plant IDs to delete.
   * @returns - An object indicating that the delete was successful.
   * @throws BadRequestException if any of the provided IDs are invalid.
   */
  @Post("multiple")
  async deleteMany(@Body() ids: string[]): Promise<{ deleted: boolean }> {
    ids.forEach((id: string) => {
      const validObjectId = Types.ObjectId.isValid(id);
      if (!validObjectId) {
        throw new BadRequestException("Invalid ObjectId: ", id);
      }
      try {
        // TODO: Delete picture from storage
        this.plantService.delete(id);
      } catch (e) {
        Logger.log(e);
      }
    });
    return { deleted: true };
  }
}
