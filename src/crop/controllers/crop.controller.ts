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
import { CreateCropDto } from '../dto/crop/create-crop.dto';
import { UpdateCropDto } from '../dto/crop/update-crop.dto';
import { CropService } from '../providers/crop.service';

@Controller('crops')
@UseInterceptors(CacheInterceptor)
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createCropDto: CreateCropDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(createCropDto);
    //TODO: Do something with the file!
    console.log(file);
    return this.cropService.create(createCropDto, 'nothing_for_now');
  }

  //@CacheKey('myCustomKey')
  //@CacheTTL(300)
  @Get()
  findAll() {
    return this.cropService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto) {
    return this.cropService.update(id, updateCropDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropService.delete(id);
  }
}
