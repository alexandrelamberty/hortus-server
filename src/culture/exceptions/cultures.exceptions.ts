import { NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";

export default class CultureNotFoundException extends NotFoundException {
  constructor(objectId: Types.ObjectId) {
    super(`Culture with id ${objectId} not found`);
  }
}
