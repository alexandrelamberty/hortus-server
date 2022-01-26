import { IsMACAddress , IsString, IsIP, IsNotEmpty, MinLength } from 'class-validator';

export class CreateMeasurementDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  readonly value: string;

  @IsNotEmpty()
  readonly timestamp: string;
}
