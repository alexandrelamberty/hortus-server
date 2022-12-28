import { NotFoundException } from "@nestjs/common";

export default class PlantNotFoundException extends NotFoundException {
  constructor(objectId: string) {
    super(`Plant with id ${objectId} not found`);
  }
}
