import { PartialType } from "@nestjs/mapped-types";
import { CreatePlantDto } from "./create-plant.dto";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdatePlantDto extends PartialType(CreatePlantDto) {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly _id: string;
}
