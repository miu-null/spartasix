import {
  Body,
  CACHE_MANAGER,
  Controller,
  Inject,
  Patch,
  Post,
  Redirect,
  Req,
  Res,
  UnauthorizedException,
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
  async login(@Body() data: loginDto, @Res() res) {
    const user = await this.authService.login(data.email, data.password);

    res.cookie("accessToken", user.accessToken, { httpOnly: true });
    res.cookie("refreshToken", user.refreshToken, { httpOnly: true });
    return res.json(user.user["id"]);
  }

  @Post("/logout")
  async logout(@Req() req, @Res() res) {
    const header = req.headers.cookie;
    const accessToken = header.split(";")[0].split("=")[1];
    const refreshtoken = header.split(";")[1].split("=")[1];

    await this.authService.logout(header)

    res.clearCookie("accessToken", accessToken);
    res.clearCookie("refreshToken", refreshtoken);

    return res.json(true);
  }

  @Post("/find-password")
  async findPassword(@Body() data: findPasswordDto, @Res() res) {
    const randomPassword = await this.authService.findPassword(
      data.email,
      data.phone,
    );

    return res.json({ data: randomPassword });
  }

  @Patch("/new-password")
  async newPassword(@Body() data: loginDto) {
    await this.authService.newPassword(data.email, data.password);

    return true;
  }

  @Post("/new-accessToken")
  async newAccessToken(@Req() req: any, @Res() res) {
    const header = req.headers.cookie;

    if (!header) {
      throw new UnauthorizedException("로그인이 필요한 기능입니다.");
    }

    const newpayload = await this.authService.newAccessToken(header);

    if (newpayload) {
      res.clearCookie("accessToken", newpayload.accessToken);
      res.clearCookie("refreshToken", newpayload.refreshtoken);

      res.cookie("accessToken", newpayload.newAccessToken);
      res.cookie("refreshToken", newpayload.refreshtoken);

      return res.json(newpayload);
    } else {
      throw new UnauthorizedException(`토큰 만료`);
    }
  }
}
