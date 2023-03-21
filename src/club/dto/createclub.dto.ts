import { IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateClubDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @Type(() => Number)
  @IsNumber()
  readonly maxMembers: number;

  @IsString()
  readonly category: string;
}
