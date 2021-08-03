import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePlantFamilyDto } from './dto/create-plant-family.dto';
import { UpdatePlantFamilyDto } from './dto/update-plant-family.dto';
import { PlantFamilyService } from './plant-family.service';

@Controller('families')
export class PlantFamilyController {
  constructor(private readonly plantsFamilyService: PlantFamilyService) {}

  @Post()
  create(@Body() createPlantFamilyDto: CreatePlantFamilyDto) {
    console.log(createPlantFamilyDto);
    return this.plantsFamilyService.create(createPlantFamilyDto);
  }

  @Get()
  findAll() {
    return this.plantsFamilyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantsFamilyService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlantFamilyDto: UpdatePlantFamilyDto,
  ) {
    return this.plantsFamilyService.update(id, updatePlantFamilyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantsFamilyService.delete(id);
  }
}
