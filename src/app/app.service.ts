import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getVersion(): string {
    return "Hortus API v1.0.0";
  }
}
