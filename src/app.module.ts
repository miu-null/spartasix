import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
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
import { AuthMiddleware } from "./auth/auth.middleware";
import { MailerModule } from "@nestjs-modules/mailer";
import { MailerConfigService } from "./config/mailer.config.service";
import { MailModule } from "./mail/mail.module";
import { ClubCommentModule } from "./comments/clubcomment/clubcomment.module";
import { EventCommentModule } from "./comments/eventcomment/eventcomment.module";
import { PaginationModule } from "./pagination/pagination.module";
import { CacheConfigService } from "./config/redis.config.service";
const ejsMiddleware = require("express-ejs-layouts");

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
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ejsMiddleware)
      .exclude(
        { path: "sign", method: RequestMethod.GET },
        { path: "sign", method: RequestMethod.POST },
        "sign/(.*)",
      )
      .forRoutes("/");
    consumer
      .apply(AuthMiddleware)

      .forRoutes(
        {
          path: "/eventcomment/create-comment/:id",
          method: RequestMethod.POST,
        },
        {
          path: "/eventcomment/update-comment/:id",
          method: RequestMethod.PATCH,
        },
        {
          path: "/eventcomment/delete-comment/:id",
          method: RequestMethod.DELETE,
        },

        {
          path: "/clubcomment/create-comment/:id",
          method: RequestMethod.POST,
        },
        {
          path: "/clubcomment/update-comment/:id",
          method: RequestMethod.PATCH,
        },
        {
          path: "/clubcomment/delete-comment/:id",
          method: RequestMethod.DELETE,
        },
        {
          path: "/club/clubspost",
          method: RequestMethod.POST,
        },
        { path: "/list/:clubId", method: RequestMethod.DELETE },
        { path: "/club/:clubId", method: RequestMethod.POST },
        { path: "/club/:clubspost", method: RequestMethod.POST },
        { path: "/club/clubs/:clubId", method: RequestMethod.PUT },
        { path: "/list/:clubid", method: RequestMethod.DELETE },
      );
  }
}
