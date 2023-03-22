import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/createuser.dto";
import { loginDto } from "./dto/login.dto";
import { Cache } from "cache-manager";
import { findPasswordDto } from "./dto/findpassword.dto";
import { MailService } from "src/mail/mail.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private authService: AuthService,
    private mailService: MailService,
  ) { }
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
    // res.setHeader('Content-Type','application/json; charset=utf-8');
    // res.setHeader("Authorization", "Bearer " + user.accessToken + user.refreshToken)
    res.cookie("accessToken", user.accessToken);
    res.cookie("refreshToken", user.refreshToken);
    return res.json(user)
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

  @Get("/test")
  @UseGuards(AuthGuard())
  async test() {
    const a = "1"

    return a
  }

  @Get("/new-accessToken")
  async newAccessToken(@Req() req, next: Function) {
    const header = req.headers.cookie;
    const newpayload = await this.authService.newAccessToken(header);

    req.user = newpayload["id"];
    
  }
}
