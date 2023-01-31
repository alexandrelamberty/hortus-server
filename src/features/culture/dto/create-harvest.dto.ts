import { IsISO8601, IsNumber, IsString } from "class-validator";

export class CreateHarvestDto {
  @IsString()
  action: string;

  @IsNumber()
  readonly quantity: number;

  @IsNumber()
  readonly weight: number;

  @IsISO8601()
  readonly date: Date;
}
