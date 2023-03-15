import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Clubs } from "src/entities/clubs.entity";
import { Users } from "src/entities/users.entity";
import { ClubMembers } from "src/entities/clubmembers.entity";
import { ClubController } from "./club.controller";
import { ClubService } from "./club.service";
import { ClubMembersRepository } from "src/userpage/clubmember.repository";
@Module({
  imports: [TypeOrmModule.forFeature([Clubs, Users, ClubMembers])],
  // PassportModule.register({
  //   defaultStrategy: "jwt",
  // }),
  controllers: [ClubController],
  providers: [ClubService, ClubMembersRepository],
  exports: [TypeOrmModule],
})
export class ClubModule {}
