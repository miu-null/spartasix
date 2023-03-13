import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/createuser.dto";
import { loginDto } from "./dto/login.dto";
import { Cache } from "cache-manager";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private authService: AuthService,
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

  // 미들웨어 테스트용 api
  @Post("/test")
  async test(@Req() req: any, @Res() res: any): Promise<string> {
    console.log(req.user);

    return res.render("../test")
  }

  // redis 테스트용 api
  @Get("/")
  async getCache() {
    // await this.cacheManager.set("user9", "9");
    // console.log(this.cacheManager)
    console.log(await this.cacheManager.get("4"));
  }
}
