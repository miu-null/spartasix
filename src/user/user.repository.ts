import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entity/user.entity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async createUser(
    email: string,
    password: string,
    nickName: string,
    phone: string,
  ) {

    const nickname = await this.checkNickname(nickName);

    if(nickname === null) {
      return this.userRepository.insert({
        email,
        password,
        nickName,
        phone,
        type: "user",
      });
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email, deletedAt: null },
      select: ["userId", "email", "password"],
    });

    if (!user) {
      throw new NotFoundException(`회원이 존재하지 않습니다.`);
    }

    if (user.password !== password) {
      throw new UnauthorizedException(`비밀번호가 올바르지 않습니다.`);
    }

    const payload = { id: user.userId };
    const accessToken = await this.jwtService.signAsync(payload);
    
    return accessToken;
  }

  async checkNickname(nickName: string) {
    let nickname = await this.userRepository.findOne({
      where: { nickName, deletedAt: null},
    })

    if (nickname === null) {
      return null;
    }
    
    return nickname
  }

}
