import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventComments } from "src/entities/eventcomments.entity";
import { Repository } from "typeorm";

@Injectable()
export class EventCommentRepository {
  constructor(
    @InjectRepository(EventComments)
    private readonly eventRepository: Repository<EventComments>,
  ) {}
}
