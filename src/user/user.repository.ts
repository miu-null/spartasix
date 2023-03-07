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
    name: string,
    nickName: string,
    phone: string,
  ) {
    this.userRepository.insert({
      email,
      password,
      name,
      nickName,
      phone,
      type: "user",
    });
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
}
