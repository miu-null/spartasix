import { IsEmail, IsString } from "class-validator";

export class remindEmailDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  postIMG:string;

  @IsString()
  startDate:Date;

  @IsString()
  endDate:Date;

  @IsString()
  title:string;
}
