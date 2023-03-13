import { Body, Controller, Post, Param, Get, Put, Delete, Patch, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/createevent.dto";
import { UpdateEventDto } from "./dto/updateevent.dto";
import { DeleteEventDto } from "./dto/deleteevent.dto";

@Controller('events')
export class EventController {
  constructor(private eventService: EventService) { }



  @Get('/list')
  async getEvent() {
    const events = await this.eventService.getEvents();
    return events
  }

  @Get('/event/:eventPostId')
  async getEventById(@Param('eventPostId') eventPostId: number) {
    return await this.eventService.getEventById(eventPostId);
  }


  @Post("/newevent")
  async createUser(@Body() data: CreateEventDto) {
    return await this.eventService.createEvent(
      data.eventPostId,
      data.userId,
      data.title,
      data.content,
      data.date,
    );
  }


  @Patch("/event/:eventPostId")
  async updateUser(
    @Param("eventPostId") eventPostId: number,
    @Request() req,
    @Body() data: UpdateEventDto,
  ) {
    const user: any = req.user;

    const changedInfo = await this.eventService.updateUser(eventPostId, {
      userId: data.userId,
      title: data.title,
      content: data.content,
      date: data.date,
    });
    return changedInfo;
  }


  @Delete('/event/:userId')
  deleteArticle(
    @Param('userId') userId: number, deleteEventDto: DeleteEventDto

  ) {
    return this.eventService.deleteEvent(userId, deleteEventDto);
  }

}
