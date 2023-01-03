import { Transform } from "class-transformer";
import { IsDate, IsNumberString, IsOptional } from "class-validator";
import { toDate, toLowerCase, trim } from "../helpers/cast.helper";

export class QueryDto {
  @Transform(({ value }) => trim(value))
  @IsOptional()
  public something: string;

  @Transform(({ value }) => toLowerCase(value))
  @IsOptional()
  public title: string;

  @IsNumberString()
  @IsOptional()
  public month: string;

  @Transform(({ value }) => toDate(value))
  @IsDate()
  @IsOptional()
  public date: Date;
}
