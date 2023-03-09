import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  Param,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: any, res: any, next: Function) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("토큰이 없습니다.");
    }

    let token: string;
    try {
      token = authHeader.split(" ")[1];
      const payload = await this.jwtService.verify(token);
      req.user = payload;
      next();
    } catch (err) {
      throw new UnauthorizedException(`Invalid JWT: ${token}`);
    }
  }

  // // 로그인한 사람과 params로 넘어온 userId가 같은지 판별
  // // 다르면 에러핸들링 // Authguard
  // async currentUser(Param: any, req: any, res: any, next: Function) {
  //   const user: any = req.user;
  //   try {
  //     if (user.id === Param.userId) next();
  //   } catch (error) {
  //     throw ;
  //   }
  // }
}
