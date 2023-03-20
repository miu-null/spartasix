import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
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
      throw new BadRequestException("이미 존재하는 닉네임 입니다.");
    }
    const myphone = phone.split("-").join("");

    if (!findemail && !nickname) {
      return await this.userRepository.insert({
        email,
        password,
        nickName,
        phone: myphone,
        type: "user",
      });
    }
  }

  async login(email: string) {
    const user = await this.userRepository.findOne({
      where: { email, deletedAt: null },
      select: ["id", "email", "password"],
    });

    if (!user) {
      throw new NotFoundException("회원이 존재하지 않습니다.");
    }

    return user;
  }

  async findPassword(email: string, phone: string) {
    const findphone = phone.split("-").join("");

    const user = await this.userRepository.findOne({
      where: { email, phone: findphone, deletedAt: null },
      select: ["email"],
    });

    if (!user) {
      throw new BadRequestException("회원이 존재하지 않습니다.");
    }

    return user;
  }

  async newPassword(email: string, password: string) {
    const userId = await this.userRepository.findOne({
      where: { email },
      select: ["id"],
    });

    await this.userRepository.update(userId, { password: password });
    return true;
  }

  async checkThisUser(userId: number) {
    const thisUser = await this.userRepository.findOne({
      where: { id: userId },
      select: ["email", "nickName", "snsURL", "userIMG"],
    });
    return thisUser;
  }

  async checkMyInfo(userId: number) {
    const myInfo = await this.userRepository.findOne({
      where: { id: userId },
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
      where: { email, deletedAt: null },
    });

    return findemail;
  }
}
