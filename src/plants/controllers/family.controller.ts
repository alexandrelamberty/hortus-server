import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateFamilyDto } from '../dto/family/create-family.dto';
import { UpdateFamilyDto } from '../dto/family/update-family.dto';
import { FamilyService } from '../providers/family.service';

@Controller('families')
export class FamilyController {
  constructor(private readonly plantsFamilyService: FamilyService) {}

  @Post()
  create(@Body() createFamilyDto: CreateFamilyDto) {
    console.log(createFamilyDto);
    return this.plantsFamilyService.create(createFamilyDto);
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
  update(@Param('id') id: string, @Body() updateFamilyDto: UpdateFamilyDto) {
    return this.plantsFamilyService.update(id, updateFamilyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantsFamilyService.delete(id);
  }
}
