import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventPosts } from "./entity/event.entity";

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(EventPosts)
    private readonly eventRepository: Repository<EventPosts>,
  ) { }

  async createEvent(
    userId: string,
    title: string,
    content: string,
    date: string,
  ) {
    this.eventRepository.insert({
      title,
      content,
      date,
    });
  }

  // async updateEvent(
  //   id: string,
  //   title: string,
  //   content: string,
  //   date: string,
  // ) {
  //   this.eventRepository.update({
  //     id,
  //       title,
  //       content,
  //       date,
  //   });
  // }
  // async softDeleteEvent(
  //   id: string,
  // ) {
  //   this.eventRepository.softDelete({
  //     id,
  //   });
  // }
// }
