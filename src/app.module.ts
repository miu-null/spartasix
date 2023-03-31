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
import { FilterModule } from "./filter/filter.module";
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
import { FilterService } from "./filter/filter.service";
import { PassportModule } from "@nestjs/passport";
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ButtonUserIdInterceptor } from './buttonUserId.interceptor';


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
    FilterModule,
    ClubModule,
    UserpageModule,
    AuthModule,
    RedisModule,
    MailModule,
    ClubCommentModule,
    EventCommentModule,
  ],
  controllers: [AppController],
  providers: [FilterService,     {
    provide: APP_INTERCEPTOR,
    useClass: ButtonUserIdInterceptor,
  },],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ejsMiddleware).forRoutes("/");
    // consumer.apply((req, res, next) => {
    //   res.locals.buttonUserId = req.user ? req.user : null;
    //   next();
    // });

  }
}
