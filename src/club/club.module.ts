import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Clubs } from "src/entities/clubs.entity";
import { Users } from "src/entities/users.entity";
import { ClubMembers } from "src/entities/clubmembers.entity";
import { ClubController } from "./club.controller";
import { ClubService } from "./club.service";
import { SearcherService } from "src/searcher/searcher.service";
import { SearcherRepository } from "src/searcher/searcher.repositoy";
import { Searcher } from "src/entities/searcher.entity";
import { ClubRepository } from "./club.repository";
import { EventRepository } from "src/event/event.repository";
import { EventPosts } from "src/entities/eventposts.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Clubs, Users, ClubMembers, Searcher, EventPosts]),
  ],
  controllers: [ClubController],
  providers: [ClubService, ClubRepository, SearcherService, SearcherRepository, EventRepository],
  exports: [ClubService, ClubRepository, ],
})
export class ClubModule {}
