import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventPosts } from "src/entities/eventposts.entity";
import { Users } from "../entities/users.entity";
import { Repository } from "typeorm";
import { UpdateEventDto } from "src/event/dto/updateevent.dto";
import { DeleteEventDto } from "./dto/deleteevent.dto";

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(EventPosts)
    private readonly eventRepository: Repository<EventPosts>,
  ) {}

  async getEvents() {
    const events = await this.eventRepository
      .createQueryBuilder("eventUser")
      .leftJoinAndSelect("eventUser.user", "nickName")
      .getMany();
    console.log(events);
    return events;
  } // mySQL leftjoin


  async getEventById(eventPostId) {
    const event = await this.eventRepository
    .createQueryBuilder("eventUser")
    .where(eventPostId)
    .leftJoinAndSelect("eventUser.user", "nickName")
    .getOne();
  console.log(event);
    return event

  }

  async createEvent(
    userId: number,
    title: string,
    content: string,
    date: Date,
  ) {
    await this.eventRepository.insert({
      userId,
      title,
      content,
      date,
    });
  }

  async updateEvent(eventPostId: number, UpdateEventInfo: UpdateEventDto) {
    console.log(UpdateEventInfo);
    const changedInfo = await this.eventRepository.update(eventPostId, {
      userId: UpdateEventInfo.userId,
      title: UpdateEventInfo.title,
      content: UpdateEventInfo.content,
      date: UpdateEventInfo.date,
    });
    return changedInfo;
  }

  async deleteEvent(eventPostId: number, deleteEventDto: DeleteEventDto) {
    await this.eventRepository.delete({ eventPostId });
  }
}
