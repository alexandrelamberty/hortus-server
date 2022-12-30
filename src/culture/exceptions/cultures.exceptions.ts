import { NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
/**
 * An exception that is thrown when a culture is not found.
 */
export class CultureNotFoundException extends NotFoundException {
  /**
   * Constructs a new `CultureNotFoundException`.
   *
   * @param id The ID of the culture that was not found.
   */
  constructor(id: Types.ObjectId) {
    super(`Culture with id ${id} not found`);
  }
}
