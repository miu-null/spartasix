import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { checkNicknameDto } from "./dto/ckecknickname.dto";
import { CreateUserDto } from "./dto/createuser.dto";
import { loginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("/sign-up")
  async createUser(@Body() data: CreateUserDto) {
    const user = await this.authService.createUser(
      data.email,
      data.password,
      data.confirmpassword,
      data.nickName,
      data.phone,
    );

    if (user === undefined) {
      return true;
    }
  }

  @Post("/sign-in")
  async login(@Body() data: loginDto) {
    await this.authService.login(data.email, data.password);

    return true;
  }

  @Post("/check-nickname")
  async checkNickname(@Body() data: checkNicknameDto) {
    const nickname = await this.authService.checkNickname(data.nickName);

    return nickname;
  }

  // 미들웨어 테스트용 api
  @Post("/test")
  @UseGuards(AuthGuard())
  async test() {
    const user = "user"
    return user
  }
}
