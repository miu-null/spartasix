import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  Next,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "src/redis/redis.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private redisService: RedisService,
    private jwtService: JwtService,
  ) {}

  async use(req: any, res: any, next: Function) {
    const token = req.headers.cookie;
    const accesstoken = token.split(";")[0].split("=")[1];

    if (!accesstoken) {
      throw new BadRequestException("로그인 후 이용 가능한 기능입니다.");
    }

    const payload = await this.authService.validateAcc(accesstoken);

    if (!payload) {
      throw new BadRequestException("로그인 후 이용 가능한 기능 입니다.")
    }

    req.user = payload["id"];
    next();
  }
}
