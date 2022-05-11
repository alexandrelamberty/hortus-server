import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateCultureDto } from '../dto/create-culture.dto'
import { UpdateCultureDto } from '../dto/update-culture.dto'
import { CultureService } from '../providers/culture.service'

@ApiTags('cultures')
@Controller('cultures')
export class CultureController {
  constructor(private readonly cultureService: CultureService) {}

  @Post()
  @ApiOperation({ summary: 'Create a culture' })
  create(@Body() createCultureDto: CreateCultureDto) {
    const result = this.cultureService.create(createCultureDto)
    return result
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a culture by it id' })
  findOne(@Param('id') id: string) {
    return this.cultureService.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a culture' })
  update(@Param('id') id: string, @Body() updateCultureDto: UpdateCultureDto) {
    return this.cultureService.update(id, updateCultureDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cultureService.delete(id)
  }

  @Get()
  findAll() {
    return this.cultureService.findAll()
  }
}
