import { IsNotEmpty } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';
export class CreatePlantDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly familyId: MongooseSchema.Types.ObjectId;

  @IsNotEmpty()
  readonly genusId: MongooseSchema.Types.ObjectId;

  @IsNotEmpty()
  readonly typeId: MongooseSchema.Types.ObjectId;

  @IsNotEmpty()
  readonly description: string;

  readonly image: string;

  readonly seeding: number[];

  readonly transplanting: number[];

  readonly planting: number[];

  readonly harvesting: number[];

  readonly spacing: number;

  readonly rows: number;
}
