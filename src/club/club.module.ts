import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Clubs } from "src/entities/clubs.entity";
import { Users } from "src/entities/users.entity";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigService } from "src/config/jwt.config.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClubMembers } from "src/entities/clubmembers.entity";
import { ClubController } from "./club.controller";
import { ClubService } from "./club.service";
import { ClubMembersRepository } from "src/userpage/clubmember.repository";
import { SearcherService } from "src/searcher/searcher.service";
import { SearcherRepository } from "src/searcher/searcher.repositoy";
import { EventPosts } from "src/entities/eventposts.entity";
import { Searcher } from "src/entities/searcher.entity";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    TypeOrmModule.forFeature([Clubs, Users, ClubMembers, EventPosts, Searcher]),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [ClubController],
  providers: [
    ClubService,
    ClubMembersRepository,
    SearcherService,
    SearcherRepository,
  ],
  exports: [TypeOrmModule, PassportModule],
})
export class ClubModule { }