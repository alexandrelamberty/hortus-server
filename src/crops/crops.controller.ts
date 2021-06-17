import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Crop } from './schemas/crop.schema';

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  create(@Body() createPlantationDto: CreateCropDto) {
    return this.cropsService.create(createPlantationDto);
  }

  @Get()
  findAll() {
    return this.cropsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto) {
    return this.cropsService.update(id, updateCropDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropsService.delete(id);
  }

  /*@Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }*/
}
