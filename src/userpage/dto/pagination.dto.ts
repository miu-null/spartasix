import { IsOptional, IsNumber, IsDate, IsInt, Min, Max } from "class-validator";

export class PaginationDto {
  // @IsOptional()
  // @IsDate()
  // startCursor?: Date;

  // @IsOptional()
  // @IsDate()
  // endCursor?: Date;

  // @IsOptional()
  // @IsInt()
  // @Min(1)
  // @Max(50)
  // limit?: number = 3;

  cursor?: number;

  type?: string;
}
