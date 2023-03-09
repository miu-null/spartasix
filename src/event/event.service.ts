import { Injectable } from '@nestjs/common';
import { EventRepository } from "./event.repository"; 

@Injectable()
export class EventService {


    constructor(private EventRepository: EventRepository) {}

    
    async createEvent(
        userId: string,
        title: string,
        content: string,
        date: string,
        viewCount: number,
      ) {
        await this.EventRepository.createEvent(

            userId,
            title,
            content,
            date,
        );
      }

      // async updateEvent(
      //   id: number,
      //   title: string,
      //   content: string,
       
      // ) {
      //   this.EventRepository.updateEvent(id, { title, content });
      // }


//       async deleteEvente(id: number) {
//         this.EventRepository.softDeleteEvent(id);
//       }
      

// }
