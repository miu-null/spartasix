import { CacheModule, Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheConfigService } from "src/config/redis.config.service";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    CacheModule.register({
      imports: [ConfigModule],
      useClass: CacheConfigService,
      inject: [ConfigService],
    }),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
  ],
  providers: [RedisService],
  exports: [],
  controllers: [],
})
export class RedisModule {}
