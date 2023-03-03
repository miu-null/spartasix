import { IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly nickName: string;

  @IsString()
  readonly phone: string;
}
