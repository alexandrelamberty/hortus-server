import {
  IsNotEmpty, IsString,
  MaxLength
} from 'class-validator';


export class CreateSpeciesDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly name: string;
}
