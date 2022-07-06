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
import { ParseObjectIdPipe } from '../../common/pipe/ParseObjectIdPipe'
import { CreateSpeciesDto } from '../dto/species/create-species.dto'
import { UpdateSpeciesDto } from '../dto/species/update-species.dto'
import { SpeciesService } from '../providers/species.service'
import { PaginationParams } from '../../common/paginationParams'

@ApiTags('species')
@Controller('plants')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get()
  listSpecies(@Query() { skip, limit }: PaginationParams) {
    return this.speciesService.listSpecies(skip, limit)
  }

  @Post()
  createSpecies(@Body() createSpeciesDto: CreateSpeciesDto) {
      return this.speciesService.createSpecies(createSpeciesDto)
  }

  @Get(':id')
  readSpecies(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.speciesService.readSpecies(id)
  }

  @Put(':id')
  updateSpecies(@Param('id', ParseObjectIdPipe) id: ObjectId, @Body() updateSpeciesDto: UpdateSpeciesDto) {
    return this.speciesService.updateSpecies(id, updateSpeciesDto)
  }

  @Delete(':id')
  deleteSpecies(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.speciesService.deleteSpecies(id)
  }
}
