import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventRepository } from "./event.repository";
import { EventPosts } from "src/entities/eventposts.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EventPosts])],
  controllers: [EventController],
  providers: [EventService, EventRepository],
})
export class EventModule { }
