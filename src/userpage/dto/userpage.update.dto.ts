import { IsNotEmpty } from "class-validator";
export class UserUpdateDto {
  @IsNotEmpty()

  email: string;
  password: string;
  phone: string;
  userIMG: string;
  nickName: string;
  snsUrl: string;
}
