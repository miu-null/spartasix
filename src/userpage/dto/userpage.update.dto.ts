import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class UserUpdateDto {
  // @IsNotEmpty()
  // email: string;
  // password: string;
  // phone: string;
  // userIMG: string;
  // nickName: string;
  // snsUrl: string;
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly userIMG: string;

  @IsString()
  readonly nickName: string;

  @IsString()
  readonly snsUrl: string;

  @IsNumber()
  readonly phone: string;
}
