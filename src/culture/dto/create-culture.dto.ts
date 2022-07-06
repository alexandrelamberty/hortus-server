import { IsNotEmpty, IsString, MaxLength, IsNumber, IsDate, ValidateNested, IsDefined, IsNotEmptyObject } from 'class-validator';
import { Type as TypeClass } from 'class-transformer';
import { Seed } from '../../seeds/schemas/seed.schema';
import { Harvesting } from '../schemas/harvesting.schema';
import { Planting } from '../schemas/planting.schema';
import { Seeding } from '../schemas/seeding.schema';
import { Transplanting } from '../schemas/transplanting.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCultureDto {

	@TypeClass(() => Seed)
  public seed: Seed;

  @ValidateNested()
  @TypeClass(() => Seeding)
  public seeding: Seeding = new Seeding();

  @ValidateNested()
  @TypeClass(() => Transplanting)
  public transplanting: Transplanting = new Transplanting();

  @ValidateNested()
  @TypeClass(() => Planting)
  public planting: Planting = new Planting();

  @ValidateNested()
  @TypeClass(() => Harvesting)
  public harvesting: Harvesting = new Harvesting();
}
