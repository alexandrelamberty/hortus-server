import {
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
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
import { CreatePlantDto } from '../dto/create-plant.dto';
import { UpdatePlantDto } from '../dto/update-plant.dto';
import { PlantsService } from '../providers/plants.service';

@Controller('plants')
@UseInterceptors(CacheInterceptor)
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createPlantationDto: CreatePlantDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(createPlantationDto);
    //TODO: Do something with the file!
    console.log(file);
    return this.plantsService.create(createPlantationDto, 'nothing_for_now');
  }

  //@CacheKey('myCustomKey')
  //@CacheTTL(300)
  @Get()
  findAll() {
    return this.plantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlantDto: UpdatePlantDto) {
    return this.plantsService.update(id, updatePlantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantsService.delete(id);
  }
}
