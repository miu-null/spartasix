import {
  Body,
  CACHE_MANAGER,
  Controller,
  Inject,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/createuser.dto";
import { loginDto } from "./dto/login.dto";
import { Cache } from "cache-manager";
import { findPasswordDto } from "./dto/findpassword.dto";
import { MailService } from "src/mail/mail.service";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private authService: AuthService,
    private mailService: MailService,
  ) {}
  @Post("/sign-up")
  async createUser(@Body() data: CreateUserDto, @Res() res) {
    await this.authService.createUser(
      data.email,
      data.password,
      data.confirmpassword,
      data.nickName,
      data.phone,
    );

    return res.json(true);
  }

  @Post("/sign-in")
  async login(@Body() data: loginDto, @Res() res, @Req() req) {
    const user = await this.authService.login(data.email, data.password);
    res.cookie("accessToken", user.accessToken);
    res.cookie("refreshToken", user.refreshToken);
    return res.json(true);
  }

  @Post("/find-password")
  async findPassword(@Body() data: findPasswordDto) {
    const randomPassword = await this.authService.findPassword(
      data.email,
      data.phone,
    );

    return true;
  }
}
