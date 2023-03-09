import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserPageRepository } from "./userpage.repository";
import { UserpageController } from "./userpage.controller";
import { UserpageService } from "./userpage.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtConfigService } from "src/config/jwt.config.service";
import { Users } from "src/entities/users.entity";
import { Clubs } from "src/entities/clubs.entity";
import { EventPosts } from "src/entities/eventposts.entity";
import { ClubMembers } from "src/entities/clubmembers.entity";

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
export class UserpageModule { }
