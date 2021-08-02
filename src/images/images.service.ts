import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
  getImage(id: string): string {
    return 'Get Image ID:' + id;
  }
}
