import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateCropDto } from '../dto/crop/create-crop.dto';
import { UpdateCropDto } from '../dto/crop/update-crop.dto';
import { CropService } from '../providers/crop.service';

@Controller('crops')
@UseInterceptors(CacheInterceptor)
export class CropController {
  constructor(private readonly cropService: CropService,
    private readonly configService: ConfigService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './upload',
    }),
  }))
  uploadPicture(
    @Body() createCropDto: CreateCropDto,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = req.user; //as UserDto;
    return this.cropService.create(createCropDto, file.filename);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './upload',
    }),
  }))
  create(
    @Body() createCropDto: CreateCropDto,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = req.user; //as UserDto;
    return this.cropService.create(createCropDto, file.filename);
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
