import { Injectable } from '@nestjs/common';
import { EventRepository } from "./event.repository"; 

@Injectable()
export class EventService {

    constructor(private userRepository: EventRepository) {}
    
    async createEvent(
        userId: string,
        title: string,
        content: string,
        date: Date,
        viewCount: number,
      ) {
        // await this.userRepository.createEvent(
        //     userId,
        //     title,
        //     content,
        //     date,
        // );
      }
}
