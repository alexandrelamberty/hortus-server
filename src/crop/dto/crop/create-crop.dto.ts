import { Type as TypeClass } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';
import { Harvesting } from 'src/crop/schemas/harvesting.schema';
import { Planting } from 'src/crop/schemas/planting.schema';
import { Seeding } from 'src/crop/schemas/seeding.schema';
import { Transplanting } from 'src/crop/schemas/transplanting.schema';
import { Type } from 'src/crop/schemas/type.schema';

export class CreateCropDto {

  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly description: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly type: MongooseSchema.Types.ObjectId;

  @IsString()
  readonly image: string;

  readonly harvest: number[];

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

  readonly companions: MongooseSchema.Types.ObjectId[];

  readonly competitors: MongooseSchema.Types.ObjectId[];

  @IsNotEmptyObject()
  @ValidateNested()
  @TypeClass(() => Type)
  readonly seeding: Seeding;

  @IsNotEmptyObject()
  @ValidateNested()
  @TypeClass(() => Type)
  readonly transplanting: Transplanting;

  @IsNotEmptyObject()
  @ValidateNested()
  @TypeClass(() => Type)
  readonly planting: Planting;

  @IsNotEmptyObject()
  @ValidateNested()
  @TypeClass(() => Type)
  readonly harvesting: Harvesting;

  @IsNumber()
  @MaxLength(3)
  readonly spacing: number;

  @IsNumber()
  @MaxLength(3)
  readonly rows: number;
}
