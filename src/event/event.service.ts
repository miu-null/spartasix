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

  async getEventById(id) {
    return await this.EventRepository.getEventById(id);
  }
  
  async remindEvent(email:string,startDate:Date,endDate:Date,title:string){
    return await this.mailService.remindEmail(email,startDate,endDate,title)
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
