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
import { EventPosts } from "src/entities/events.entity";
import { AbusingClubCounts } from "src/entities/abusingclubcounts.entity";
import { ClubCommentService } from "src/comments/clubcomment/clubcomment.service";
import { ClubCommentRepository } from "src/comments/clubcomment/clubcomment.repository";
import { ClubComments } from "src/entities/clubcomments.entity";
import { ClubCommentLikes } from "src/entities/clubcommentlikes.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Clubs,
      Users,
      ClubMembers,
      EventPosts,
      AbusingClubCounts,
      ClubComments,
      ClubCommentLikes,
    ]),
  ],
  controllers: [ClubController],
  providers: [
    ClubService,
    ClubRepository,
    SearcherService,
    SearcherRepository,
    ClubCommentService,
    ClubCommentRepository,
  ],
  exports: [
    ClubService,
    ClubRepository,
    ClubCommentService,
    ClubCommentRepository,
  ],
})
export class ClubModule {}
