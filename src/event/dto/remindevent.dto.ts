import { IsEmail } from "class-validator";

export class remindEmailDto {
  @IsEmail()
  readonly email: string;
}
