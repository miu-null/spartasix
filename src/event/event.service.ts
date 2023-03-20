import { Injectable } from "@nestjs/common";
import { EventRepository } from "./event.repository";
import { UpdateEventDto } from "src/event/dto/updateevent.dto";
import { DeleteEventDto } from "./dto/deleteevent.dto";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class EventService {
  constructor(
    private EventRepository: EventRepository,
    private readonly mailService: MailService,
    ) {}

  async getEvents(page) {
    const event = await this.EventRepository.paginatedResults(page);
    // const eventlist = event.map({ eventId, nickName });
    // return eventlist;
    return event;
  }

  async getEventById(eventPostId) {
    return await this.EventRepository.getEventById(eventPostId);
  }
  
  async remindEvent(email:string){
    return await this.mailService.remindEmail(email)
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

  async updateEvent(eventPostId: number, updateEventInfo) {
    const eventPost = await this.EventRepository.updateEvent(
      eventPostId,
      updateEventInfo,
    );
    return true;
  }

  async deleteEvent(eventPostId: number) {
    await this.EventRepository.deleteEvent(eventPostId);
    return true;
  }
}
