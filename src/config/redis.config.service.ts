import { ConfigService } from "@nestjs/config";
import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";
import * as redisStore from "cache-manager-ioredis";

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private configService: ConfigService) {}
  createCacheOptions(): CacheModuleOptions<Record<string, any>> {
    return {
      store: redisStore,
      // username: this.configService.get<string>('REDIS_USERNAME'),  // 발표진행시 cloud 연결용
      // password: this.configService.get<string>('REDIS_PASSWORD'),  // 발표진행시 cloud 연결용
      host: this.configService.get<string>("REDIS_HOST"),
      port: this.configService.get<number>("REDIS_PORT"),
      ttl: this.configService.get<number>("REDIS_TTL"),
    };
  }
}
