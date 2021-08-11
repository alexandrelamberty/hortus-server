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
import { CreatePlantDto } from '../dto/plant/create-plant.dto';
import { UpdatePlantDto } from '../dto/plant/update-plant.dto';
import { PlantService } from '../providers/plant.service';

@Controller('plants')
@UseInterceptors(CacheInterceptor)
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createPlantationDto: CreatePlantDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(createPlantationDto);
    //TODO: Do something with the file!
    console.log(file);
    return this.plantService.create(createPlantationDto, 'nothing_for_now');
  }

  //@CacheKey('myCustomKey')
  //@CacheTTL(300)
  @Get()
  findAll() {
    return this.plantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlantDto: UpdatePlantDto) {
    return this.plantService.update(id, updatePlantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantService.delete(id);
  }
}
