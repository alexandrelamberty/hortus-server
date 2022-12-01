import { Type as TypeClass } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Schema as MongooseSchema } from "mongoose";
import { Harvesting } from "src/seeds/schemas/harvesting.schema";
import { Planting } from "src/seeds/schemas/planting.schema";
import { Seeding } from "src/seeds/schemas/seeding.schema";
import { Plant } from "src/plant/schemas/plant.schema";
import { Transplanting } from "src/seeds/schemas/transplanting.schema";

export class CreateSeedDto {
  @TypeClass(() => Plant)
  public plant: Plant;

  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  public description: string;

  public image: string;

  @IsString()
  @IsNotEmpty()
  public type: string;

  public harvest: [];

  @IsString()
  @IsNotEmpty()
  public season: string;

  @IsString()
  @IsNotEmpty()
  public sun: string;

  @IsString()
  @IsNotEmpty()
  public frost: string;

  @IsString()
  @IsNotEmpty()
  public water: string;

  public competitors: MongooseSchema.Types.ObjectId[];

  public companions: MongooseSchema.Types.ObjectId[];

  // FIXME: IPhase ?
  public seeding: Seeding;

  public transplanting: Transplanting;

  public planting: Planting;

  public harvesting: Harvesting;

  // The spacing betwee plants
  public spacing: number;

  // The spacing between rows of plants
  public rows: number;
}
