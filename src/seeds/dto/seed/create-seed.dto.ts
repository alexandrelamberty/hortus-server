import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';
import { Harvesting } from 'src/seeds/schemas/harvesting.schema';
import { Planting } from 'src/seeds/schemas/planting.schema';
import { Seeding } from 'src/seeds/schemas/seeding.schema';
import { Transplanting } from 'src/seeds/schemas/transplanting.schema';

export class CreateSeedDto {
  
  readonly species: MongooseSchema.Types.ObjectId

  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly description: string;

  readonly image: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

  readonly harvest: [];

  @IsString()
  @IsNotEmpty()
  readonly season: string;

  @IsString()
  @IsNotEmpty()
  readonly sun: string;

  @IsString()
  @IsNotEmpty()
  readonly frost: string;

  @IsString()
  @IsNotEmpty()
  readonly water: string;

  readonly competitors: MongooseSchema.Types.ObjectId[];

  readonly companions: MongooseSchema.Types.ObjectId[];

  readonly seeding: Seeding;

  readonly transplanting: Transplanting;

  readonly planting: Planting;

  readonly harvesting: Harvesting;

  readonly spacing: number;

  readonly rows: number;
}
