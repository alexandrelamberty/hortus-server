import { IsOptional, IsString, MaxLength } from "class-validator";
import { PaginationQueryParams } from "../../common/dto/pagination-params.dto";

export class QueryCultureParams extends PaginationQueryParams {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly name?: string;
}
