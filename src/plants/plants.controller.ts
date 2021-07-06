import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant } from './schemas/plant.schema';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  // @Post()
  // create(@Body() createPlantationDto: CreatePlantDto) {
  //   return this.plantsService.create(createPlantationDto);
  // }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(
    @Body() createPlantationDto: CreatePlantDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    //file: file.buffer.toString();
    console.log(createPlantationDto);
    return this.plantsService.create(createPlantationDto);
  }

  @Get()
  findAll() {
    return this.plantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlantDto: UpdatePlantDto) {
    return this.plantsService.update(id, updatePlantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantsService.delete(id);
  }
}
