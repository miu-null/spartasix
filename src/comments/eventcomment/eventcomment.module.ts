import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventComments } from "src/entities/eventcomments.entity";
import { EventCommentController } from "./eventcomment.controller";
import { EventCommentRepository } from "./eventcomment.repository";
import { EventCommentService } from "./eventcomment.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([EventComments]),
  ],
  controllers: [EventCommentController],
  providers: [EventCommentService, EventCommentRepository],
})
export class EventCommentModule {}
