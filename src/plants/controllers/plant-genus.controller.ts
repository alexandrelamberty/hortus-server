import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePlantGenusDto } from '../dto/create-plant-genus.dto';
import { UpdatePlantGenusDto } from '../dto/update-plant-genus.dto';
import { PlantGenusService } from '../providers/plant-genus.service';

@Controller('genera')
export class PlantGenusController {
  constructor(private readonly plantGenusService: PlantGenusService) {}

  @Post()
  create(@Body() createPlantGenusDto: CreatePlantGenusDto) {
    console.log(createPlantGenusDto);
    return this.plantGenusService.create(createPlantGenusDto);
  }

  @Get()
  findAll() {
    return this.plantGenusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantGenusService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlantGenusDto: UpdatePlantGenusDto,
  ) {
    return this.plantGenusService.update(id, updatePlantGenusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantGenusService.delete(id);
  }
}
