import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateClubDto {
  // @Type(() => Number)
  // @IsNumber()
  // readonly clubId: number;

  @Type(() => Number)
  @IsNumber()
  readonly userId: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly maxMembers: string;
}
