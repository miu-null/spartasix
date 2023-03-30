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
      username: this.configService.get<string>("REDIS_USERNAME"),
      password: this.configService.get<string>("REDIS_PASSWORD"),
      host: "redis-12571.c273.us-east-1-2.ec2.cloud.redislabs.com",
      port: this.configService.get<number>("REDIS_PORT"),
      ttl: this.configService.get<number>("REDIS_TTL"),
    };
  }
}
