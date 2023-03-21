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
    return events;
  } // mySQL leftjoin

  async getEventById(eventPostId) {
    const event = await this.eventRepository
      .createQueryBuilder("eventUser")
      .where("eventPostId = :eventPostId", {eventPostId})
      .leftJoinAndSelect("eventUser.user", "nickName")
      .getOne();
    return event;
  }
  //글 생성
  async createEvent(
    userId: number,
    title: string,
    content: string,
    startDate: Date,
    endDate: Date,
    postIMG: string,
  ) {
    await this.eventRepository.insert({
      userId,
      title,
      content,
      startDate,
      endDate,
      postIMG,
    });
  }

  async updateEvent(eventPostId: number, UpdateEventInfo) {
    const changedInfo = await this.eventRepository.update(eventPostId, {
      userId: UpdateEventInfo.userId,
      title: UpdateEventInfo.title,
      content: UpdateEventInfo.content,
      startDate: UpdateEventInfo.startDate,
      endDate: UpdateEventInfo.endDate,
      postIMG: UpdateEventInfo.postIMG,
    });
    return changedInfo;
  }

  async deleteEvent(eventPostId: number) {
    await this.eventRepository.softDelete(eventPostId);
    return true;
  }
}
