import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHome(): string {
    return "Nidus API";
  }
  getVersion(): string {
    return "1.0.0";
  }
}
