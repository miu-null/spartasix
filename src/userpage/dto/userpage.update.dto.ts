import { IsNotEmpty } from "class-validator";
export class UserUpdateDto {
  @IsNotEmpty()
  password: string;
  phone: number;
  userIMG: string;
  nickName: string;
  snsUrl: string;
}
