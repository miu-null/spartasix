import { Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { Users } from "../entities/users.entity"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private configservice: ConfigService,
  ) {
    super({
      secretOrKey: configservice.get<string>("JWT_SECRET"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }


  async validate(payload: {id: number}, @Req() req): Promise<Users>  {
    const { id } = payload;
    console.log(id)
    const user = await this.userRepository.findOne({
      where: {userId: id},
      select: ["userId", "email", "nickName"]
    })
    if (!user) {
      throw new UnauthorizedException()
    }
    req.user = user
    console.log(req.user)
    return user;

  }
}
