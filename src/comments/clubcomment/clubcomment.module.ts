import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtConfigService } from "src/config/jwt.config.service";
import { typeOrmConfigService } from "src/config/typeorm.config.service";
import { ClubCommentLikes } from "src/entities/clubcommentlikes.entity";
import { ClubComments } from "src/entities/clubcomments.entity";
import { ClubCommentController } from "./clubcomment.controller";
import { ClubCommentRepository } from "./clubcomment.repository";
import { ClubCommentService } from "./clubcomment.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ClubComments, ClubCommentLikes]),
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
  ],
  controllers: [ClubCommentController],
  providers: [ClubCommentService, ClubCommentRepository],
  exports: [],
})
export class ClubCommentModule {}
