import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTypeDto } from '../dto/type/create-type.dto';
import { UpdateTypeDto } from '../dto/type/update-type.dto';
import { TypeService } from '../providers/type.service';

@Controller('types')
export class TypeController {
  constructor(private readonly plantTypeService: TypeService) {}

  @Post()
  create(@Body() createPlantationDto: CreateTypeDto) {
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
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.plantTypeService.update(id, updateTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantTypeService.delete(id);
  }
}
