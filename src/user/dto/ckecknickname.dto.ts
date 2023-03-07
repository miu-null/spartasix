import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./createuser.dto";

export class checkNicknameDto extends PickType(CreateUserDto, [
  "nickName",
] as const) {}