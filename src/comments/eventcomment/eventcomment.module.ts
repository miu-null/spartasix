import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtConfigService } from "src/config/jwt.config.service";
import { typeOrmConfigService } from "src/config/typeorm.config.service";
import { EventComments } from "src/entities/eventcomments.entity";
import { EventCommentController } from "./eventcomment.controller";
import { EventCommentRepository } from "./eventcomment.repository";
import { EventCommentService } from "./eventcomment.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([EventComments]),
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
  controllers: [EventCommentController],
  providers: [EventCommentService, EventCommentRepository],
})
export class EventCommentModule {}
