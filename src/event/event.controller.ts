// import { Body, Controller, Post } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { EventService } from "./event.service";
// import { CreateEventDto } from "./dto/createevent.dto";
// @Controller('event')
// export class EventController {
//         constructor(private eventService: EventService) {}
    
//         @Post("/sign-up")
//         async createUser(@Body() data: CreateEventDto) {
//           return this.eventService.createEvent(
//             data.userId,
//             data.title,
//             data.content,
//             data.date,
//             data.viewCount,
//           );
//         }
    
// }
