import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ObjectId } from 'mongoose'
import { ParseObjectIdPipe } from 'src/common/pipe/ParseObjectIdPipe'
import { CreateSpeciesDto } from '../dto/species/create-species.dto'
import { UpdateSpeciesDto } from '../dto/species/update-species.dto'
import { SpeciesService } from '../providers/species.service'
import { PaginationParams } from './paginationParams'

@ApiTags('species')
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get()
  findAll(@Query() { skip, limit }: PaginationParams) {
    return this.speciesService.findAll(skip, limit)
  }

  @Post()
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
      return this.speciesService.create(createSpeciesDto)
  }

  @Get(':id')
  read(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.speciesService.read(id)
  }

  @Put(':id')
  update(@Param('id', ParseObjectIdPipe) id: ObjectId, @Body() updateSpeciesDto: UpdateSpeciesDto) {
    return this.speciesService.update(id, updateSpeciesDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.speciesService.delete(id)
  }
}
