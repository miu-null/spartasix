import { Injectable } from "@nestjs/common";
import { EventRepository } from "./event.repository";
import { MailService } from "src/mail/mail.service";
import { EventCommentService } from "src/comments/eventcomment/eventcomment.service";

@Injectable()
export class EventService {
  constructor(
    private EventRepository: EventRepository,
    private readonly mailService: MailService,
    private readonly eventCommentService: EventCommentService,
  ) {}

  async getEvents() {
    const events = await this.EventRepository.getEvents();
    return events;
  }

  async getEventById(id) {
    const data = await this.EventRepository.getEventById(id);
    const comments = await this.eventCommentService.showAllComment(id);

    return { data, comments };
  }

  async remindEvent(
    email: string,
    startDate: Date,
    endDate: Date,
    title: string,
  ) {
    return await this.mailService.remindEmail(email, startDate, endDate, title);
  }

  async createEvent(
    userId: number,
    title: string,
    content: string,
    startDate: Date,
    endDate: Date,
    postIMG: string,
  ) {
    await this.EventRepository.createEvent(
      userId,
      title,
      content,
      startDate,
      endDate,
      postIMG,
    );
  }

  async updateEvent(id: number, updateEventInfo) {
    const eventPost = await this.EventRepository.updateEvent(
      id,
      updateEventInfo,
    );
    return true;
  }

  async deleteEvent(id: number) {
    await this.EventRepository.deleteEvent(id);
    return true;
  }
}
