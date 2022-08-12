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
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ObjectId, Types } from 'mongoose'
import { PaginationParams } from '../../common/paginationParams'
import { ParseObjectIdPipe } from '../../common/pipe/ParseObjectIdPipe'
import { CreatePlantDto } from '../dto/create-plant.dto'
import { UpdatePlantDto } from '../dto/update-plant.dto'
import { PlantService } from '../providers/plant.service'
import { ListPlantsResponse } from '../responses/ListPlantsResponse'
import { Plant } from '../schemas/plant.schema'


@Controller('plants')
export class PlantController {
  constructor(private readonly plantService: PlantService) { }

  @Get()
  listPlants(@Query() { skip, limit }: PaginationParams): Promise<ListPlantsResponse> {
    return this.plantService.listPlants(skip, limit)
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPlant(@Body() createPlantDto: CreatePlantDto, @UploadedFile() file: Express.Multer.File): Promise<Plant> {
    console.log(createPlantDto)
    console.log(file)
    if (file)
      createPlantDto.picture = file.filename;
    return this.plantService.createPlant(createPlantDto)
  }

  @Get(':id')
  readPlant(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<Plant> {
    return this.plantService.readPlant(id)
  }

  @Put(':id')
  updatePlant(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Body() updatePlantDto: UpdatePlantDto): Promise<Plant> {
    return this.plantService.updatePlant(id, updatePlantDto)
  }

  @Delete('/plants/:id')
  deletePlant(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<Plant> {
    return this.plantService.deletePlant(id)
  }

  @Delete(':ids')
  deleteCultureByIds(@Param('ids') ids: string) {
    const aids = ids.split(',')
    aids.forEach((value) => {
      const validObjectId = Types.ObjectId.isValid(value)
      if (!validObjectId) {
        throw new BadRequestException('Invalid ObjectId')
      }
      const di: Types.ObjectId = Types.ObjectId(value)
      this.plantService.deletePlant(di)
    })
    return aids
  }
}
