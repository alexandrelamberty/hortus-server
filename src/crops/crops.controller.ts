import { Controller, Get } from '@nestjs/common';
import { CropService } from './crops.service';
import { Crop } from './crops.entity';

@Controller('crop')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Get()
  findAll(): Promise<Crop[]> {
    return this.cropService.findAll();
  }
}
