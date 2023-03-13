import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { JwtConfigService } from "./config/jwt.config.service";
import { typeOrmConfigService } from "./config/typeorm.config.service";
import { SearcherModule } from "./searcher/searcher.module";
import { ClubModule } from "./club/club.module";
import { EventModule } from "./event/event.module";
import { UserpageModule } from "./userpage/userpage.module";
import { AuthModule } from "./auth/auth.module";
import { RedisModule } from "./redis/redis.module";
import "dotenv/config";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: typeOrmConfigService,
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),

    EventModule,
    SearcherModule, //김재광 검색기능 테스트
    ClubModule,
    UserpageModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
