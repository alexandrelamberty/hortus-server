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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSeedDto } from '../dto/seed/create-seed.dto';
import { UpdateSeedDto } from '../dto/seed/update-seed.dto';
import { SeedService } from '../providers/seed.service';

@Controller('seeds')
@UseInterceptors(CacheInterceptor)
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createSeedationDto: CreateSeedDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(createSeedationDto);
    //TODO: Do something with the file!
    console.log(file);
    return this.seedService.create(createSeedationDto, 'nothing_for_now');
  }

  //@CacheKey('myCustomKey')
  //@CacheTTL(300)
  @Get()
  findAll() {
    return this.seedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seedService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSeedDto: UpdateSeedDto) {
    return this.seedService.update(id, updateSeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seedService.delete(id);
  }
}
