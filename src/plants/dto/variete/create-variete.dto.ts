import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';
import { Harvesting } from 'src/plants/schemas/harvesting.schema';
import { Planting } from 'src/plants/schemas/planting.schema';
import { Seeding } from 'src/plants/schemas/seeding.schema';
import { Transplanting } from 'src/plants/schemas/transplanting.schema';

export class CreateVarieteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly description: string;

  @IsArray()
  @IsNotEmpty()
  @MaxLength(2)
  readonly harvest: number[];

  @IsNotEmpty()
  readonly season: string;

  @IsNotEmpty()
  readonly sun: string;

  @IsNotEmpty()
  readonly frost: string;

  @IsNotEmpty()
  readonly water: string;

  @IsArray()
  readonly companions: MongooseSchema.Types.ObjectId[];

  @IsArray()
  readonly competitors: MongooseSchema.Types.ObjectId[];

  readonly seeding: Seeding;

  readonly transplanting: Transplanting;

  readonly planting: Planting;

  readonly harvesting: Harvesting;

  @IsNumber()
  readonly spacing: number;

  @IsNumber()
  readonly rows: number;
}
