import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateGenusDto } from '../dto/genus/create-genus.dto';
import { UpdateGenusDto } from '../dto/genus/update-genus.dto';
import { GenusService } from '../providers/genus.service';

@Controller('genera')
export class GenusController {
  constructor(private readonly genusService: GenusService) {}

  @Post()
  create(@Body() createGenusDto: CreateGenusDto) {
    console.log(createGenusDto);
    return this.genusService.create(createGenusDto);
  }

  @Get()
  findAll() {
    return this.genusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genusService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGenusDto: UpdateGenusDto) {
    return this.genusService.update(id, updateGenusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genusService.delete(id);
  }
}
