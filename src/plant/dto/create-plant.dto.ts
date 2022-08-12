import {
  IsNotEmpty, IsString,
  MaxLength
} from 'class-validator';


export class CreatePlantDto {

  picture: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly family: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly genus: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly species: string;

  // FIXME: check in schema ?
  readonly subspecies: string;

  // FIXME: Can be null but restrict type and length
  readonly variant: string;
}
