import { Body, Controller, Post } from "@nestjs/common";
import { checkNicknameDto } from "./dto/ckecknickname.dto";
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
      data.confirmpassword,
      data.nickName,
      data.phone,
    );
  }

  @Post("/sign-in")
  async login(@Body() data: loginDto) {
    return this.userService.login(data.email, data.password);
  }

  @Post("/check-nickname")
  async checkNickname(@Body() data: checkNicknameDto) {
    const nickname = await this.userService.checkNickname(data.nickName);

    return nickname;
  }
}
