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
import { SharpPipe } from "src/common/pipe/SharpPipe";
import { PaginationParams } from "../../common/paginationParams";
import { ParseObjectIdPipe } from "../../common/pipe/ParseObjectIdPipe";
import { CreatePlantDto } from "../dto/create-plant.dto";
import { UpdatePlantDto } from "../dto/update-plant.dto";
import { PlantService } from "../providers/plant.service";
import { ListPlantsResponse } from "../responses/ListPlantsResponse";
import { Plant } from "../schemas/plant.schema";

@Controller("plants")
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  // TODO: No pagination implementation ?
  @Get()
  listPlants(
    @Query() { skip, limit }: PaginationParams
  ): Promise<ListPlantsResponse> {
    return this.plantService.listPlants(skip, limit);
  }

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  createPlant(
    @Body() createPlantDto: CreatePlantDto,
    @UploadedFile(SharpPipe) file: string
  ): Promise<Plant> {
    if (file) {
      createPlantDto.image = file;
    }
    Logger.log("createPlantDTO", createPlantDto);
    return this.plantService.createPlant(createPlantDto);
  }

  @Get(":id")
  readPlant(
    @Param("id", ParseObjectIdPipe) id: Types.ObjectId
  ): Promise<Plant> {
    return this.plantService.readPlant(id);
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor("image"))
  updatePlant(
    @Param("id", ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updatePlantDto: UpdatePlantDto,
    @UploadedFile(SharpPipe) file: string
  ): Promise<Plant> {
    if (file) {
      updatePlantDto.image = file;
    }
    return this.plantService.updatePlant(id, updatePlantDto);
  }

  // TODO: Delete picture from storage
  @Delete("/multiple/:ids")
  deletePlantByIds(@Param("ids") ids: string) {
    const aids = ids.split(",");
    aids.forEach((value) => {
      const validObjectId = Types.ObjectId.isValid(value);
      Logger.log(value);
      if (!validObjectId) {
        throw new BadRequestException("Invalid ObjectId");
      }
      const di: Types.ObjectId = Types.ObjectId(value);
      this.plantService.deletePlant(di);
    });
    return aids;
  }
}
