import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Get(':id')
  view(@Param('id') id: string, @Res() res: Response): any {
    const path = join(__dirname, '../../upload/', id);
    console.log(path);
    //res.setHeader('content-type', 'image/jpg');
    res.set('Content-Type', 'image/jpg');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(path);
    //return this.imagesService.getImage(id);
  }
}
