import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
@Injectable()
export class RedisService {
  set(arg0: string, refreshToken: string) {
    throw new Error("Method not implemented.");
  }
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setRefreshToken(
    user: { id: string; email: string },
    refreshToken: string,
  ) {
    console.log("redis")
    await this.cacheManager.set(refreshToken, {
      userId: user.id,
      email: user.email,
    });
  }

  async getRefreshToken(token: string) {
    const user = await this.cacheManager.get(token);
    return user;
  }
}
