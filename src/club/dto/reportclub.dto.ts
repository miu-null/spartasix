import { IsString } from "class-validator";

export class ReportClubDto {
  @IsString()
  readonly reportReason: string;

  @IsString()
  readonly reportContent: string;
}
