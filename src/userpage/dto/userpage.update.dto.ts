import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsOptional } from "class-validator";
import { CreateUserDto } from "src/auth/dto/createuser.dto";

export class UserUpdateDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  readonly userIMG?: string;
  @IsOptional()
  @IsString()
  readonly snsUrl?: string;
}
