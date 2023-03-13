import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { RedisService } from "src/redis/redis.service";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

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
    // 뭔가 생성될 때는 객체/ Id를 리턴해주는 것이 권장됩니다.
    if (password !== confirmpassword) {
      throw new BadRequestException(
        "비밀번호와 비밀번호 확인란이 일치하지 않습니다.",
      );
    }
    const hashpassword = await this.transformPassword(password);
    await this.authRepository.createUser(email, hashpassword, nickName, phone);
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.login(email);
    const validatePassword = await bcrypt.compare(password, user.password);

    if (validatePassword === false) {
      throw new UnauthorizedException("비밀번호가 올바르지 않습니다.");
    }

    const accessToken = await this.AccessToken(user.userId);
    const refreshToken = await this.RefreshToken(user.email);
    console.log("acc   " + accessToken);
    console.log("ref   " + refreshToken);

    await this.redisService.setRefreshToken(
      {
        id: user.userId.toString(),
        email: user.email,
      },
      refreshToken,
    );

    return { ...user, accessToken, refreshToken };
  }

  async transformPassword(password: string) {
    const hashpassword = await bcrypt.hash(password, 10);
    return hashpassword;
  }

  async AccessToken(id: number) {
    const accessToken = await this.jwtService.signAsync({ id });
    return accessToken;
  }

  async RefreshToken(email: string) {
    const refreshToken = await this.jwtService.signAsync({ email });
    return refreshToken;
  }

  async validateAcc(token: string) {
    try {
      const validatetoken = await this.jwtService.verify(token);

      return validatetoken;
    } catch (error) {
      return false;
    }
  }

  async validateRef(token: string) {
    try {
      const validatetoken = await this.jwtService.verify(token);

      return validatetoken;
    } catch (error) {
      return false;
    }
  }
}
