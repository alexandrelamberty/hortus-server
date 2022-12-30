import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePlantDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  image?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  readonly name!: string;

  @IsString()
  @MaxLength(25)
  readonly family!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  readonly genus!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  readonly species!: string;

  @IsString()
  @IsOptional()
  @MaxLength(25)
  readonly subspecies?: string;

  @IsString()
  @IsOptional()
  @MaxLength(25)
  readonly variety?: string;

  @IsString()
  @IsOptional()
  @MaxLength(25)
  readonly forma?: string;

  @IsString()
  @IsOptional()
  @MaxLength(25)
  readonly cultivar?: string;

  @IsString()
  @IsOptional()
  @MaxLength(25)
  readonly hybrid?: string;
}
