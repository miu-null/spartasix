import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Clubs } from "src/entities/clubs.entity";
import { Users } from "src/entities/users.entity";
import { ClubMembers } from "src/entities/clubmembers.entity";
import { ClubController } from "./club.controller";
import { ClubService } from "./club.service";
import { ClubMembersRepository } from "src/userpage/clubmember.repository";
import { SearcherService } from "src/searcher/searcher.service";
import { SearcherRepository } from "src/searcher/searcher.repositoy";
import { EventPosts } from "src/entities/eventposts.entity";
import { Searcher } from "src/entities/searcher.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Clubs, Users, ClubMembers, EventPosts, Searcher])],
  // PassportModule.register({
  //   defaultStrategy: "jwt",
  // }),
  controllers: [ClubController],
  providers: [ClubService, ClubMembersRepository, 
   SearcherService, SearcherRepository, 
  ],
  exports: [TypeOrmModule],
})
export class ClubModule {}
