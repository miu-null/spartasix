import { IsString, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly confirmpassword: string;

  @IsString()
  readonly nickName: string;

  @IsString()
  readonly phone: string;
}
