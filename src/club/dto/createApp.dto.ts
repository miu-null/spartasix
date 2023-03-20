import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from "class-validator";

export class CreateAppDto {
  @IsNotEmpty()
  @IsString()
  readonly application: string;

  @IsOptional()
  @IsBoolean()
  readonly isAccepted: boolean;
}
