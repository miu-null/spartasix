import { Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { Users } from "../entities/users.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private configservice: ConfigService,
  ) {
    super({
      secretOrKey: configservice.get<string>("JWT_SECRET"),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: any) => {
          let token = null;
          if (req && req.headers.cookie) {
            token = req.headers.cookie;
            token = token.split(";")[0].split("=")[1];
          }
          return token;
        },
      ]),
      passReqToCallback: true,
    });
  }

  async validate(@Req() req, payload: { id: number }) {
    const { id } = payload;
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException('회원이 존재하지 않습니다.');
    }

    req.user = user.id;
    return user.id
  }
}
