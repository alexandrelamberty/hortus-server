import { IsNotEmpty } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';
export class CreatePlantDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly family: MongooseSchema.Types.ObjectId;

  @IsNotEmpty()
  readonly genus: MongooseSchema.Types.ObjectId;

  @IsNotEmpty()
  readonly type: MongooseSchema.Types.ObjectId;

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
