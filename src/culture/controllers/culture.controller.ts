import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ObjectId } from 'mongoose'
import { PaginationParams } from '../../common/paginationParams'
import { CreateCultureDto } from '../dto/create-culture.dto'
import { UpdateCultureDto } from '../dto/update-culture.dto'
import { PhaseStatus } from '../enum/phase-status.enum'
import { CultureService } from '../providers/culture.service'
import { Harvesting } from '../schemas/harvesting.schema'
import { Planting } from '../schemas/planting.schema'
import { Seeding } from '../schemas/seeding.schema'
import { Transplanting } from '../schemas/transplanting.schema'

@ApiTags('cultures')
@Controller('cultures')
export class CultureController {
  constructor(private readonly cultureService: CultureService) { }

  @Get()
  listCultures(@Query() { skip = 0, limit = 20 }: PaginationParams) {
    return this.cultureService.listCultures(skip, limit)
  }

  @Post()
  createCulture(@Body() createCultureDto: CreateCultureDto) {
    // FIXME:
    createCultureDto.seeding = new Seeding();
    createCultureDto.seeding.status = PhaseStatus.Pending;
    createCultureDto.transplanting = new Transplanting();
    createCultureDto.planting = new Planting();
    createCultureDto.harvesting = new Harvesting();
    const result = this.cultureService.createCulture(createCultureDto);
    return result
  }

  @Get(':id')
  readCulture(@Param('id') id: ObjectId) {
    return this.cultureService.readCulture(id)
  }

  @Put(':id')
  updateCulture(@Param('id') id: ObjectId, @Body() updateCultureDto: UpdateCultureDto) {
    return this.cultureService.updateCulture(id, updateCultureDto)
  }

  @Delete(':id')
  deleteCulture(@Param('id') id: ObjectId) {
    return this.cultureService.deleteCulture(id)
  }


}
