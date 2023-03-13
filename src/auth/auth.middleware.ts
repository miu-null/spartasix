import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { RedisService } from "src/redis/redis.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private redisService: RedisService,
  ) {}

  async use(req: any, next: Function) {
    const token = req.headers.cookie;
    const accesstoken = token.split(";")[0].split("=")[1];
    const refreshtoken = token.split(";")[1].split("=")[1];

    if (!accesstoken) {
      throw new UnauthorizedException("로그인 후 이용 가능한 기능입니다.");
    }

    const payload = await this.authService.validateAcc(accesstoken);

    try {
      if (payload === false) {
        const user = await this.redisService.getRefreshToken(refreshtoken);

        if (!user) {
          throw new UnauthorizedException("로그인 후 이용 가능한 기능입니다.");
        }

        const newAccessToken = await this.authService.AccessToken(
          Number(user["userId"]),
        );
        const newPayload = await this.authService.validateAcc(newAccessToken);

        req.user = newPayload["id"];
        next();
      } else {
        req.user = payload["id"];
        next();
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
