import { Body, Controller, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/createuser.dto";
import { loginDto } from "./dto/login.dto";
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

  @Post("/sign-in")
  async login(@Body() data: loginDto) {
    return this.userService.login(data.email, data.password);
  }
}
