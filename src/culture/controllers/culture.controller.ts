import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCultureDto } from '../dto/create-culture.dto';
import { UpdateCultureDto } from '../dto/update-culture.dto';
import { CultureService } from '../providers/culture.service';

@Controller('cultures')
export class CultureController {
  constructor(private readonly cultureService: CultureService) {}

  @Post()
  create(@Body() createCultureDto: CreateCultureDto) {
    const result = this.cultureService.create(createCultureDto);
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cultureService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCultureDto: UpdateCultureDto) {
    return this.cultureService.update(id, updateCultureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cultureService.delete(id);
  }

  @Get()
  findAll() {
    return this.cultureService.findAll();
  }
}
