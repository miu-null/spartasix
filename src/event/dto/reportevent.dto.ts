import { IsString } from "class-validator";

export class ReportEventDto {
  @IsString()
  readonly reportReason: string;

  @IsString()
  readonly reportContent: string;
}
