import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePlantTypeDto } from './dto/create-plant-type.dto';
import { UpdatePlantTypeDto } from './dto/update-plant-type.dto';
import { PlantTypeService } from './plant-type.service';

@Controller('types')
export class PlantTypeController {
  constructor(private readonly plantTypeService: PlantTypeService) {}

  @Post()
  create(@Body() createPlantationDto: CreatePlantTypeDto) {
    console.log(createPlantationDto);
    return this.plantTypeService.create(createPlantationDto);
  }

  @Get()
  findAll() {
    return this.plantTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantTypeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlantTypeDto: UpdatePlantTypeDto,
  ) {
    return this.plantTypeService.update(id, updatePlantTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantTypeService.delete(id);
  }
}
