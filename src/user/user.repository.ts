import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../entities/users.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) { }

  async createUser(
    email: string,
    password: string,
    nickName: string,
    phone: string,
  ) {
    const nickname = await this.checkNickname(nickName);

    if (nickname === null) {
      return await this.userRepository.insert({
        email,
        password,
        nickName,
        phone,
        type: "user",
      });
    } else {
      throw new UnauthorizedException(
        "닉네임 또는 비밀번호가 올바르지 않습니다.",
      );
    }
  }

  async login(email: string) {
    console.log(email)
    const user = await this.userRepository.findOne({
      where: { email, deletedAt: null },
      select: ["userId", "email", "password"],
    });

    if (!user) {
      throw new NotFoundException("회원이 존재하지 않습니다.");
    }

    const payload = { id: user.userId };
    const accessToken = await this.jwtService.signAsync(payload);

    return {...user, accessToken};
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

    if (nickname === null) {
      return null;
    }

    return nickname;
  }


}
