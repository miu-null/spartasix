import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { UserPageRepository } from "./userpage.repository";
import { UserpageController } from "./userpage.controller";
import { UserpageService } from "./userpage.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigService } from "src/config/jwt.config.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
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
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
  ],
  controllers: [UserpageController],
  providers: [UserpageService, UserPageRepository],
})
export class UserpageModule {}
