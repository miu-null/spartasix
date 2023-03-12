import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setRefreshToken(userId: string, refreshToken: string) {
    await this.cacheManager.set(userId, refreshToken);
  }

  async getRefreshToken(userId: string) {
    await this.cacheManager.get(userId);
  }
}
