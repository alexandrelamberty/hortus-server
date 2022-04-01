import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
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
// @UseInterceptors(CacheInterceptor)
export class SeedController {
  
  private readonly logger = new Logger(SeedController.name);

  constructor(private readonly seedService: SeedService) {}

	// TODO Add pagination query
  @Get()
  findAll() {
	this.logger.log("findAll")
    return this.seedService.findAll()
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() body: CreateSeedDto,
    @UploadedFile() file: Express.Multer.File
  ) {
	this.logger.log("body", body)
	this.logger.log("file", file)
	// TODO: Save the file then save the species if no erros
    return this.seedService.create(body, 'nothing_for_now')
  }

  @Get(':id')
  read(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.seedService.read(id)
  }

  @Put(':id')
  update(@Param('id', ParseObjectIdPipe) id: ObjectId, @Body() body: UpdateSeedDto) {
    return this.seedService.update(id, body)
  }

  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.seedService.delete(id)
  }
}
