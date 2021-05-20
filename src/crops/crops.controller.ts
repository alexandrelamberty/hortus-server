
 import { Body, Controller, Get, Post } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { Crop } from './schemas/crop.schema';


@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  async create(@Body() createCropDto: CreateCropDto) {
    await this.cropsService.create(createCropDto);
  }

  /*@Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }*/

  @Get()
  async findAll(): Promise<Crop[]> {
    return this.cropsService.findAll();
  }

}
