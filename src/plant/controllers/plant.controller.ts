import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Types } from "mongoose";
import { PaginationParams } from "../../common/paginationParams";
import { ParseObjectIdPipe } from "../../common/pipe/ParseObjectIdPipe";
import { SharpPipe } from "../../common/pipe/SharpPipe";
import { CreatePlantDto } from "../dto/create-plant.dto";
import { UpdatePlantDto } from "../dto/update-plant.dto";
import PlantNotFoundException from "../exceptions/plantNotFound.exception";
import { PlantService } from "../providers/plant.service";
import { PlantsResponse } from "../responses/plants.responses";
import { Plant } from "../schemas/plant.schema";

@Controller("/plants")
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Get()
  async listPlants(
    @Query() { skip, limit }: PaginationParams
  ): Promise<PlantsResponse> {
    return this.plantService.getAll(skip, limit);
  }

  @Get("/:id")
  async getById(@Param("id", ParseObjectIdPipe) id: string): Promise<Plant> {
    try {
      return await this.plantService.getById(id);
    } catch (err) {
      throw new PlantNotFoundException(id);
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async insert(
    @Body() plant: CreatePlantDto,
    @UploadedFile(SharpPipe) file: string
  ): Promise<Plant> {
    if (!file) {
      throw new BadRequestException("bad request", "no file");
    } else {
      plant.image = file;
    }
    return this.plantService.insert(plant);
  }

  @Put()
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() plant: UpdatePlantDto,
    @UploadedFile(SharpPipe) file: string
  ): Promise<Plant> {
    if (file) {
      plant.image = file;
    }
    return this.plantService.update(id, plant);
  }

  @Delete("/multiple/:ids")
  async deletePlantByIds(
    @Param("ids") ids: string
  ): Promise<{ deleted: boolean }> {
    const aids = ids.split(",");
    aids.forEach((id) => {
      const validObjectId = Types.ObjectId.isValid(id);
      if (!validObjectId) {
        throw new BadRequestException("Invalid ObjectId");
      }
      // TODO: Delete picture from storage
      this.plantService.delete(id);
    });
    return { deleted: true };
  }
}
