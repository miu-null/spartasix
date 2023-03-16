import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  Put,
  Delete,
  Patch,
  Request,
  Res,
  Render,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/createevent.dto";
import { UpdateEventDto } from "./dto/updateevent.dto";
import { DeleteEventDto } from "./dto/deleteevent.dto";

@Controller("events")
export class EventController {
  constructor(private eventService: EventService) {}

  @Get("/list")
  async getEvent(@Res() res: Response) {
    const events = await this.eventService.getEvents();
    return res.render("eventMain.ejs", { events });
  }
  // 렌더링페이지
  @Get("/newevent")
  async getNewEvent(@Res() res: Response) {
    return res.render("eventNew.ejs");
  }
  // 렌더링페이지
  @Get("/event/updateevent/:eventPostId")
  async getUpdateEvent(
    @Res() res: Response,
    @Param("eventPostId") eventPostId: number,
  ) {
    const event = await this.eventService.getEventById(eventPostId);
    return res.render("eventUpdate.ejs", { event });
  }

  @Get("/event/:eventPostId")
  async getEventById(
    @Res() res: Response,
    @Param("eventPostId") eventPostId: number,
  ) {
    const event = await this.eventService.getEventById(eventPostId);
    return res.render("eventDetail.ejs", { event });
  }

  @Post("/newevent")
  async createUser(@Res() res: Response, @Body() data: CreateEventDto) {
    const event = await this.eventService.createEvent(
      data.eventPostId,
      data.userId,
      data.title,
      data.content,
      data.date,
    );
    return res.render("eventNew.ejs", { event });
  }

  @Patch("/event/updateevent/:eventPostId")
  async updateUser(
    @Res() res: Response,
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

    return res.render("eventUpdate.ejs", { changedInfo });
  }

  @Delete("/event/:userId")
  deleteArticle(
    @Param("userId") userId: number,
    deleteEventDto: DeleteEventDto,
  ) {
    return this.eventService.deleteEvent(userId, deleteEventDto);
  }
}
