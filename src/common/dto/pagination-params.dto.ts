import { Type } from "class-transformer";
import { IsOptional, IsNumber, Min, Max } from "class-validator";

export class PaginationQueryParams {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  readonly page?: number;

  @IsOptional()
  @IsNumber()
  @Min(5)
  @Max(100)
  @Type(() => Number)
  readonly limit?: number;
}
