import { Type, Type as TypeClass } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { Schema as MongooseSchema } from "mongoose";
import { Plant } from "../../plant/schemas/plant.schema";
import { Frost } from "../enums/frost.enum";
import { Season } from "../enums/season.enum";
import { Sun } from "../enums/sun.enum";
import { Water } from "../enums/water.enum";

export class SowingDto {
  @IsNumber()
  public start: number;

  @IsNumber()
  public end: number;

  @IsNumber()
  public germination: number;
}

export class TransplantingDto {
  @IsNumber()
  public start: number;

  @IsNumber()
  public end: number;

  @IsNumber()
  public growth: number;
}

export class PlantingDto {
  @IsNumber()
  public start: number;

  @IsNumber()
  public end: number;

  @IsNumber()
  public maturity: number;
}

export class HarvestingDto {
  @IsNumber()
  public start: number;

  @IsNumber()
  public end: number;

  @IsNumber()
  public duration: number;
}

export class CreateSeedDto {
  @TypeClass(() => Plant)
  public plant: Plant;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public description: string;

  public image: string;

  @IsNotEmpty()
  @IsString()
  public type: string;

  @IsNotEmpty()
  public harvest: [];

  @IsNotEmpty()
  @IsString()
  @IsEnum(Season)
  public season: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Sun)
  public sun: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Frost)
  public frost: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Water)
  public water: string;

  @IsOptional()
  public competitors?: MongooseSchema.Types.ObjectId[];

  @IsOptional()
  public companions?: MongooseSchema.Types.ObjectId[];

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => SowingDto)
  public seeding!: SowingDto;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => TransplantingDto)
  public transplanting!: TransplantingDto;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PlantingDto)
  public planting!: PlantingDto;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => HarvestingDto)
  public harvesting!: HarvestingDto;

  @IsDefined()
  @IsNumber()
  public spacing!: number;

  @IsDefined()
  @IsNumber()
  public rows!: number;
}
