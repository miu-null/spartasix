import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/createuser.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/sign-up")
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(
      data.email,
      data.password,
      data.name,
      data.nickName,
      data.phone,
    );
  }
}
