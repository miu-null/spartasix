import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
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

    EventModule,
    SearcherModule,
    ClubModule,
    UserpageModule,
    AuthModule,
    RedisModule,
    MailModule,
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
        {path: "auth/test", method: RequestMethod.POST},
        {path: "/test", method: RequestMethod.GET}
      )
  }
}
