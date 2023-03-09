import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventPosts } from "./entity/event.entity";
import { EventRepository } from "./event.repository";

@Module({
  imports: [TypeOrmModule.forFeature([EventPosts])],
  controllers: [EventController],
  providers: [EventService, EventRepository],
})
export class EventModule {}
