import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(
    email: string,
    password: string,
    confirmpassword: string,
    nickName: string,
    phone: string,
  ) {
    if (!email || !password || !nickName || !phone) {
      throw new BadRequestException("모든 항목을 작성해 주세요.");
    }

    if (password !== confirmpassword) {
      throw new BadRequestException(
        "비밀번호와 비밀번호 확인란이 일치하지 않습니다.",
      );
    }

    await this.userRepository.createUser(email, password, nickName, phone);
  }

  async login(email: string, password: string) {
    return this.userRepository.login(email, password);
  }

  async checkNickname(nickName: string) {
    return this.userRepository.checkNickname(nickName);
  }
}
