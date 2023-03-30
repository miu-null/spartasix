import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventRepository } from "./event.repository";
import { EventPosts } from "src/entities/events.entity";
import { FilterService } from "src/filter/filter.service";
import { Clubs } from "src/entities/clubs.entity";
import { Users } from "src/entities/users.entity";
import { ClubMembers } from "src/entities/clubmembers.entity";
import { FilterRepository } from "src/filter/filter.repository";
import { ClubRepository } from "src/club/club.repository";
import { MailService } from "src/mail/mail.service";
import { AbusingClubCounts } from "src/entities/abusingclubcounts.entity";
import { EventComments } from "src/entities/eventcomments.entity";
import { EventCommentLikes } from "src/entities/eventcommentlikes.entity";
import { EventCommentService } from "src/comments/eventcomment/eventcomment.service";
import { EventCommentRepository } from "src/comments/eventcomment/eventcomment.repository";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Clubs,
      Users,
      ClubMembers,
      EventPosts,
      AbusingClubCounts,
      EventComments,
      EventCommentLikes,
    ]),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
  ],
  controllers: [EventController],
  providers: [
    MailService,
    EventService,
    EventRepository,
    FilterService,
    FilterRepository,
    ClubRepository,
    EventCommentService,
    EventCommentRepository,
  ],
  exports: [MailService, EventCommentService, EventCommentRepository],
})
export class EventModule {}
