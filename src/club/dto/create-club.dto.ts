import { IsNumber, IsString } from "class-validator";

export class CreateClubDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly maxMembers: string;
}
