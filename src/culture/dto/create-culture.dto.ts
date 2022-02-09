import { IsNotEmpty, IsString, MaxLength, IsNumber, IsDate, ValidateNested, IsDefined, IsNotEmptyObject } from 'class-validator';
import { Type as TypeClass } from 'class-transformer';
import { Seed } from '../../seeds/schemas/seed.schema';
import { Harvesting } from '../schemas/harvesting.schema';
import { Planting } from '../schemas/planting.schema';
import { Seeding } from '../schemas/seeding.schema';
import { Transplanting } from '../schemas/transplanting.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCultureDto {

	@ApiProperty({ type: Seed })
  readonly seed: Seed;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @TypeClass(() => Seeding)
	@ApiProperty()
  readonly seeding: Seeding;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @TypeClass(() => Transplanting)
	@ApiProperty({ type: Transplanting })
  readonly transplanting: Transplanting;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @TypeClass(() => Planting)
	@ApiProperty()
  readonly planting: Planting;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @TypeClass(() => Harvesting)
	@ApiProperty()
  readonly harvesting: Harvesting;
}
