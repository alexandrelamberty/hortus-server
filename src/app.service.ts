import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hortus API v1.0.0 docker detach in watch mode';
  }
}
