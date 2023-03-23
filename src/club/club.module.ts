import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Clubs } from "src/entities/clubs.entity";
import { Users } from "src/entities/users.entity";
import { ClubMembers } from "src/entities/clubmembers.entity";
import { ClubController } from "./club.controller";
import { ClubService } from "./club.service";
import { SearcherService } from "src/searcher/searcher.service";
import { SearcherRepository } from "src/searcher/searcher.repositoy";
import { ClubRepository } from "./club.repository";
import { EventRepository } from "src/event/event.repository";
import { EventPosts } from "src/entities/eventposts.entity";
import { AbusingClubCounts } from "src/entities/abusingclubcounts.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Clubs,
      Users,
      ClubMembers,
      EventPosts,
      AbusingClubCounts,
    ]),
  ],
  controllers: [ClubController],
  providers: [ClubService, ClubRepository, SearcherService, SearcherRepository],
  exports: [ClubService, ClubRepository],
})
export class ClubModule { }
