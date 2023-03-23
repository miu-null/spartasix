import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
  ) {}

  async use(req: any, res: any, next: Function) {
    const token = req.headers.cookie;
    const accesstoken = token.split(";")[0].split("=")[1];

    if (!accesstoken) {
      throw new UnauthorizedException("로그인 후 이용 가능한 기능입니다.");
    }

    const payload = await this.authService.validateAcc(accesstoken);

    if (!payload) {
      throw new UnauthorizedException("토큰이 만료되었습니다.")
    }

    req.user = payload["id"];
    next();
  }
}
