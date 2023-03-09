import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./createuser.dto";

export class loginDto extends PickType(CreateUserDto, [
  "email",
  "password",
] as const) {}
