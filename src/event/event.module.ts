import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventRepository } from "./event.repository";
import { EventPosts } from "src/entities/eventposts.entity";
import { SearcherService } from "src/searcher/searcher.service";
import { Clubs } from "src/entities/clubs.entity";
import { Users } from "src/entities/users.entity";
import { ClubMembers } from "src/entities/clubmembers.entity";
import { Searcher } from "src/entities/searcher.entity";
import { SearcherRepository } from "src/searcher/searcher.repositoy";
import { ClubRepository } from "src/club/club.repository";


@Module({
  imports: [
    TypeOrmModule.forFeature([Clubs, Users, ClubMembers, EventPosts, Searcher]),
  ],
  controllers: [EventController],
  providers: [
    EventService,
    EventRepository,
    SearcherService,
    SearcherRepository,
    ClubRepository,
  ],
})
export class EventModule {}
