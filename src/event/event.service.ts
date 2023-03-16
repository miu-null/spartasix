import { Injectable } from '@nestjs/common';
import { EventRepository } from "./event.repository";
import { UpdateEventDto } from "src/event/dto/updateevent.dto"
import { DeleteEventDto } from "./dto/deleteevent.dto";


@Injectable()
export class EventService {

  constructor(private EventRepository: EventRepository) { }


  async getEvents() {
    const test = await this.EventRepository.getEvents();
    return test
  }

  async getEventById(eventPostId) {
    return await this.EventRepository.getEventById(eventPostId)
  }

  async createEvent(
   
    userId: number,
    title: string,
    content: string,
    date: Date,
  ) {
    await this.EventRepository.createEvent(
      
      userId,
      title,
      content,
      date,
    );
  }


  async updateUser(eventPostId: number, updateEventInfo: UpdateEventDto) {
    console.log(eventPostId);
    return await this.EventRepository.updateEvent(eventPostId, updateEventInfo);
  }

  async deleteEvent(eventPostId: number, deleteEventDto: DeleteEventDto) {
    this.EventRepository.deleteEvent(eventPostId, deleteEventDto);
  }
}
