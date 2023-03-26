import { IsString, IsBoolean, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateAppDto {
  @IsString()
  @Type(() => String)
  readonly application: string;

  @IsOptional()
  @IsBoolean()
  readonly isAccepted: boolean;
}
