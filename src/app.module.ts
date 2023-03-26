import {
  Module,
  NestModule,
  MiddlewareConsumer,
  CacheModule,
} from "@nestjs/common";
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
import { MailerModule } from "@nestjs-modules/mailer";
import { MailerConfigService } from "./config/mailer.config.service";
import { MailModule } from "./mail/mail.module";
import { ClubCommentModule } from "./comments/clubcomment/clubcomment.module";
import { EventCommentModule } from "./comments/eventcomment/eventcomment.module";
import { CacheConfigService } from "./config/redis.config.service";
import { SearcherService } from "./searcher/searcher.service";
import { PassportModule } from "@nestjs/passport";

const ejsMiddleware = require("express-ejs-layouts");

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
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
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MailerConfigService,
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useClass: CacheConfigService,
      inject: [ConfigService],
    }),
    EventModule,
    SearcherModule,
    ClubModule,
    UserpageModule,
    AuthModule,
    RedisModule,
    MailModule,
    ClubCommentModule,
    EventCommentModule,
  ],
  controllers: [AppController],
  providers: [SearcherService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ejsMiddleware).forRoutes("/");
  }
}
