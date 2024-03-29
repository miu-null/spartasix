import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { MailService } from "src/mail/mail.service";
import { RedisService } from "src/redis/redis.service";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
  ) {}

  async createUser(
    email: string,
    password: string,
    confirmpassword: string,
    nickName: string,
    phone: string,
  ) {
    const hashpassword = await this.transformPassword(password);
    await this.authRepository.createUser(email, hashpassword, nickName, phone);
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.login(email);
    const validatePassword = await bcrypt.compare(password, user.password);

    if (validatePassword === false) {
      throw new BadRequestException("비밀번호가 올바르지 않습니다.");
    }

    const accessToken = await this.AccessToken(user.id);
    const refreshToken = await this.RefreshToken(user.email);

    await this.redisService.setRefreshToken(
      {
        id: user.id.toString(),
        email: user.email,
      },
      refreshToken,
    );

    return { user, accessToken, refreshToken };
  }

  async logout(header: string) {
    await this.redisService.removeToken(header)
  }

  async findPassword(email: string, phone: string) {
    const findemail = await this.authRepository.findPassword(email, phone);

    const randomPassword = await this.mailService.findPassword(email);

    return { findemail, randomPassword };
  }

  async newPassword(email: string, password: string) {
    const hashpassword = await this.transformPassword(password);
    await this.authRepository.newPassword(email, hashpassword);
    return true;
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

  async newAccessToken(header: string) {
    const accessToken = header.split(";")[0].split("=")[1];
    const refreshtoken = header.split(";")[1].split("=")[1];
    const user = await this.redisService.getRefreshToken(refreshtoken);

    if (!user) {
      throw new BadRequestException("로그인 후 이용 가능한 기능입니다.");
    }
    const newAccessToken = await this.AccessToken(Number(user["userId"]));

    const Header = { newAccessToken, refreshtoken, accessToken };

    return Header;
  }
}
