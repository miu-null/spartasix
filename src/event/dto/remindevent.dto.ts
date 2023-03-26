import { IsString } from "class-validator";

export class remindEmailDto {
  @IsString()
  readonly email: string;

  @IsString()
  startDate: Date;

  @IsString()
  endDate: Date;

  @IsString()
  title: string;
}
