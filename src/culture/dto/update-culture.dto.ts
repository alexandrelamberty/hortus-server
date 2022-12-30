import { PartialType } from "@nestjs/mapped-types";
import { CreateCultureDto } from "./create-culture.dto";

/**
 * A data transfer object (DTO) for updating a culture.
 */
export class UpdateCultureDto extends PartialType(CreateCultureDto) {}
