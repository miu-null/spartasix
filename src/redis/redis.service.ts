import { BadRequestException, CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setRefreshToken(
    user: { id: string; email: string },
    refreshToken: string,
  ) {
    await this.cacheManager.set(refreshToken, {
      userId: user.id,
      email: user.email,
    });
  }

  async getRefreshToken(token: string) {
    const user = await this.cacheManager.get(token);
    return user;
  }

  async removeToken(header: string) {
    const refreshtoken = header.split(";")[1].split("=")[1];
    const user = await this.cacheManager.get(refreshtoken);

    if(user) {
      await this.cacheManager.del(refreshtoken);
      return
    }

    if(!user) {
      throw new BadRequestException("이미 로그아웃된 상태입니다.")
    }

    return
  }
}
