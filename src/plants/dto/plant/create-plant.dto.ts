import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreatePlantDto {
  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly family: MongooseSchema.Types.ObjectId;

  @IsNotEmpty()
  readonly genus: MongooseSchema.Types.ObjectId;

  @IsNotEmpty()
  readonly type: MongooseSchema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly description: string;

  @IsString()
  readonly image: string;

  readonly varietes: MongooseSchema.Types.ObjectId[];
}
