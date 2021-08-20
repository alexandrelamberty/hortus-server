import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';
import { Harvesting } from 'src/crops/schemas/harvesting.schema';
import { Planting } from 'src/crops/schemas/planting.schema';
import { Seeding } from 'src/crops/schemas/seeding.schema';
import { Transplanting } from 'src/crops/schemas/transplanting.schema';

export class CreateCropDto {

  //@IsNotEmpty()
  readonly plant: MongooseSchema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly description: string;

  @IsNotEmpty()
  readonly type: MongooseSchema.Types.ObjectId;

  @IsString()
  readonly image: string;

  readonly harvest: number[];

  readonly season: string;

  readonly sun: string;

  readonly frost: string;

  readonly water: string;

  readonly companions: MongooseSchema.Types.ObjectId[];

  readonly competitors: MongooseSchema.Types.ObjectId[];

  readonly seeding: Seeding;

  readonly transplanting: Transplanting;

  readonly planting: Planting;

  readonly harvesting: Harvesting;

  readonly spacing: Number;

  readonly rows: Number;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}
