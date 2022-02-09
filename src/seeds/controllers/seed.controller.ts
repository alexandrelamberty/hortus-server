import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'
import { ObjectId } from 'mongoose'
import { ParseObjectIdPipe } from 'src/common/pipe/ParseObjectIdPipe'
import { CreateSeedDto } from '../dto/seed/create-seed.dto'
import { UpdateSeedDto } from '../dto/seed/update-seed.dto'
import { SeedService } from '../providers/seed.service'

@ApiTags('seeds')
@Controller('seeds')
@UseInterceptors(CacheInterceptor)
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

	// TODO Add pagination query
  @Get()
  findAll() {
    return this.seedService.findAll()
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createSeedationDto: CreateSeedDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.seedService.create(createSeedationDto, 'nothing_for_now')
  }

  @Get(':id')
  read(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.seedService.read(id)
  }

  @Put(':id')
  update(@Param('id', ParseObjectIdPipe) id: ObjectId, @Body() updateSeedDto: UpdateSeedDto) {
    return this.seedService.update(id, updateSeedDto)
  }

  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.seedService.delete(id)
  }
}
