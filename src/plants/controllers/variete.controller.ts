import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateVarieteDto } from '../dto/variete/create-variete.dto';
import { UpdateVarieteDto } from '../dto/variete/update-variete.dto';
import { VarieteService } from '../providers/variete.service';

@Controller('varietes')
export class VarieteController {
  constructor(private readonly varieteService: VarieteService) {}

  @Post()
  create(@Body() createVarieteDto: CreateVarieteDto) {
    console.log(createVarieteDto);
    return this.varieteService.create(createVarieteDto);
  }

  @Get()
  findAll() {
    return this.varieteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.varieteService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVarieteDto: UpdateVarieteDto) {
    return this.varieteService.update(id, updateVarieteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.varieteService.delete(id);
  }
}
