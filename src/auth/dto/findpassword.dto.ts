import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./createuser.dto";

export class findPasswordDto extends PickType(CreateUserDto, [
  "email",
  "phone",
] as const) {}
