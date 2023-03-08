import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../user/entity/user.entity";
import { UserPageRepository } from "./userpage.repository";
import { UserpageController } from "./userpage.controller";
import { UserpageService } from "./userpage.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtConfigService } from "src/config/jwt.config.service";
import { EventPosts } from "src/event/entity/event.entity";
import { Clubs } from "src/club/entity/club.entity";
import { ClubMembers } from "./entity/clubmembers.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Clubs, EventPosts, ClubMembers]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [UserpageController],
  providers: [UserpageService, UserPageRepository],
})
export class UserpageModule {}
