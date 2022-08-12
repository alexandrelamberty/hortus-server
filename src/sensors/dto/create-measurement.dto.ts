import { IsMACAddress, IsString, IsIP, IsNotEmpty, MinLength } from 'class-validator';

export class CreateMeasurementDto {

  @IsNotEmpty()
  readonly value: string;

  @IsNotEmpty()
  readonly timestamp: string;
}
