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
  Response,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response as Res } from "express";
import { Types } from "mongoose";
import { ParseObjectIdPipe } from "../../common/pipe/ParseObjectIdPipe";
import { SharpPipe } from "../../common/pipe/SharpPipe";
import { CreatePlantDto } from "../dto/create-plant.dto";
import { QueryPlantParams } from "../dto/query-plant.dto";
import { UpdatePlantDto } from "../dto/update-plant.dto";
import PlantNotFoundException from "../exceptions/plant.exceptions";
import { PlantsService } from "../plants.service";
import { Plant } from "../schemas/plant.schema";

/**
 * Controller class for managing requests to the plants endpoint.
 */
@Controller("plants")
export class PlantsController {
  /**
   * Creates an instance of PlantController.
   * @param plantService Service for managing plants.
   */
  constructor(private readonly plantService: PlantsService) {}

  /**
   * Retrieves a paginated list of all plants.
   * @param paginationParams Query parameters for pagination.
   * @returns List of plants.
   */
  @Get()
  async getAllPlants(
    @Query() { page, limit }: QueryPlantParams,
    @Response() res: Res
  ): Promise<any> {
    const results = await this.plantService.getAllPlants({ page, limit });
    return res
      .set({
        "Pagination-Count": results.count,
        "Pagination-Page": page,
        "Pagination-Limit": limit,
        "Content-Type": "application/json",
      })
      .json(results.plants);
  }

  /**
   * Searches for plants by name using a regex search.
   * @param name Name of the plants to search for.
   * @returns List of plants with names that contain the specified string.
   */
  @Get("/find")
  async getPlantByName(@Query("name") name: string): Promise<Plant> {
    return this.plantService.getPlantByName(name);
  }

  /**
   * Retrieves a plant by its ID.
   * @param id ID of the plant to retrieve.
   * @returns Plant with the specified ID.
   * @throws {PlantNotFoundException} If the plant with the specified ID is not found.
   */
  @Get("/:id")
  async getPlantById(
    @Param("id", ParseObjectIdPipe) id: Types.ObjectId
  ): Promise<Plant> {
    return this.plantService.getPlantById(id);
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
  async createPlant(
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
    return this.plantService.createPlant(plant);
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
  async updatePlant(
    @Param("id", ParseObjectIdPipe) id: Types.ObjectId,
    @Body() plant: UpdatePlantDto,
    @UploadedFile(SharpPipe) file: string
  ): Promise<Plant> {
    if (file) {
      plant.image = file;
    }
    try {
      return this.plantService.updatePlant(id, plant);
    } catch (err) {
      // FIXME: delete file
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
  async deletePlant(
    @Param("id", ParseObjectIdPipe) id: Types.ObjectId
  ): Promise<Plant> {
    return this.plantService.deletePlant(id);
  }

  /**
   * Deletes multiple plants by their IDs.
   * @param ids - Array of plant IDs to delete.
   * @returns - An object indicating that the delete was successful.
   * @throws BadRequestException if any of the provided IDs are invalid.
   */
  @Post("multiple")
  async deleteManyPlants(@Body() ids: string[]): Promise<{ deleted: boolean }> {
    // FIXME: decorator to check ids and create deleteMany in service
    ids.forEach((id: string) => {
      const validObjectId = Types.ObjectId.isValid(id);
      if (!validObjectId) {
        throw new BadRequestException("Invalid ObjectId: ", id);
      }
      try {
        // TODO: Delete picture from storage
        this.plantService.deletePlant(Types.ObjectId.createFromHexString(id));
      } catch (e) {
        Logger.log(e);
      }
    });
    return { deleted: true };
  }
}
