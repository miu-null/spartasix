import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from "class-validator";

export class CreateAppDto {
  @IsNumber()
  readonly userId: number;

  @IsNotEmpty()
  @IsString()
  readonly application: string;

  @IsOptional()
  @IsBoolean()
  readonly isAccepted: boolean;
}
