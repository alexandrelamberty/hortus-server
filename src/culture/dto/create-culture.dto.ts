import { Type as TypeClass } from "class-transformer";
import { Seed } from "@seeds/schemas/seed.schema";

/**
 * A data transfer object (DTO) for creating a new culture.
 */
export class CreateCultureDto {
  /**
   * The seed for the new culture.
   *
   * This should be an instance of the `Seed` class.
   * FIXME: This sould be an ObjectId
   */
  @TypeClass(() => Seed)
  public seed!: Seed;
}
