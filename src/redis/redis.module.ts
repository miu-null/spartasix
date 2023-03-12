import { CacheModule, Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheConfigService } from "src/config/redis.config.service";

@Module({
  imports: [
    CacheModule.register({
      imports: [ConfigModule],
      useClass: CacheConfigService,
      inject: [ConfigService],
    })
  ],
  providers: [RedisService],
  exports: [],
  controllers: [],
})
export class RedisModule {}
