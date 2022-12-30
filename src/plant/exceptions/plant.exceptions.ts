import { NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";

export default class PlantNotFoundException extends NotFoundException {
  constructor(objectId: Types.ObjectId) {
    super(`Plant with id ${objectId} not found`);
  }
}
