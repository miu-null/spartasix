import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthMiddleware } from "./auth/auth.middleware";
import { JwtConfigService } from "./config/jwt.config.service";
import { typeOrmConfigService } from "./config/typeorm.config.service";
import { SearcherModule } from './searcher/searcher.module';
import { SearcherRepository } from "./searcher/searcher.repositoy";
import { TypeOrmExModule } from "./typeorm-ex.module";
// import { ClubModule } from './club/club.module';
import { UserModule } from "./user/user.module";
// import { UserpageModule } from "./userpage/userpage.module";

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
    TypeOrmExModule.forCustomRepository([
      SearcherRepository]),

    UserModule,
    SearcherModule,  //김재광 검색기능 테스트
    // ClubModule,
    // UserpageModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: "user/update", method: RequestMethod.PATCH });
  }
}
