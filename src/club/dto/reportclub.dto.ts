import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class ReportClubDto {
  @IsString()
  readonly reportReason: string;

  @IsString()
  readonly reportContent: string;
}
