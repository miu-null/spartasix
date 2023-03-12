import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { RedisService } from "src/redis/redis.service";
import { Repository } from "typeorm";

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async createUser(
    email: string,
    password: string,
    nickName: string,
    phone: string,
  ) {
    const nickname = await this.checkNickname(nickName);
    const findemail = await this.checkemail(email);

    if (findemail) {
      throw new BadRequestException("이미 존재하는 이메일 입니다.");
    }

    if (nickname) {
      console.log("hello")
      throw new BadRequestException("이미 존재하는 닉네임 입니다.",);
    }

    if (!findemail && !nickname) {
      return await this.userRepository.insert({
        email,
        password,
        nickName,
        phone,
        type: "user",
      });
    }

  }

  async login(email: string) {
    const user = await this.userRepository.findOne({
      where: { email, deletedAt: null },
      select: ["userId", "email", "password"],
    });

    if (!user) {
      throw new NotFoundException("회원이 존재하지 않습니다.");
    }

    const accessToken = await this.jwtService.signAsync({ id: user.userId });
    const refreshToken = await this.jwtService.signAsync({ email: user.email });
    console.log("acc   " + accessToken);
    console.log("ref   " + refreshToken);

    await this.redisService.setRefreshToken(
      user.userId.toString(),
      refreshToken,
    );

    return { ...user, accessToken };
  }

  async checkThisUser(userId: number) {
    const thisUser = await this.userRepository.findOne({
      where: { userId },
      select: ["email", "nickName", "snsURL", "userIMG"],
    });
    return thisUser;
  }

  async checkMyInfo(userId: number) {
    const myInfo = await this.userRepository.findOne({
      where: { userId },
      select: ["email", "phone", "nickName", "snsURL", "userIMG"],
    });
    return myInfo;
  }

  async checkNickname(nickName: string) {
    const nickname = await this.userRepository.findOne({
      where: { nickName, deletedAt: null },
    });

    return nickname;
  }

  async checkemail(email: string) {
    const findemail = await this.userRepository.findOne({
      where: { email, deletedAt: null}
    })

    return findemail
  }
}
