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
import { SearcherRepository } from "src/searcher/searcher.repositoy";
import { ClubRepository} from "src/club/club.repository";
import { MailService } from "src/mail/mail.service";
import { AbusingClubCounts } from "src/entities/abusingclubcounts.entity";
import { EventComments } from "src/entities/eventcomments.entity";
import { EventCommentLikes } from "src/entities/eventcommentlikes.entity";
import { EventCommentService } from "src/comments/eventcomment/eventcomment.service";
import { EventCommentRepository } from "src/comments/eventcomment/eventcomment.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Clubs,
      Users,
      ClubMembers,
      EventPosts, AbusingClubCounts,
      EventComments,
      EventCommentLikes,
    ]),
  ],
  controllers: [EventController],
  providers: [
    MailService,
    EventService,
    EventRepository,
    SearcherService,
    SearcherRepository,
    ClubRepository,
    EventCommentService,
    EventCommentRepository
  ],
  exports: [MailService, EventCommentService, EventCommentRepository],
})
export class EventModule {}
