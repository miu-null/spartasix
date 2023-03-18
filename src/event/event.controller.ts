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
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/createevent.dto";
import { UpdateEventDto } from "./dto/updateevent.dto";
import { DeleteEventDto } from "./dto/deleteevent.dto";
import { SearcherService } from "src/searcher/searcher.service";

@Controller("events")
export class EventController {
  constructor(
    private eventService: EventService,
    private searchService: SearcherService,
  ) {}

  //새글 쓰기
  @Post("/newevent")
  async createUser(@Res() res: Response, @Body() data: CreateEventDto) {
    console.log("new event");
    const event = await this.eventService.createEvent(
      data.userId,
      data.title,
      data.content,
      data.date,
    );
    return res.json(true);
  }

  // 작성 페이지 렌더링
  @Get("/newevent")
  async getNewEvent(@Res() res: Response) {
    return res.render("eventNew.ejs");
  }

  @Get("/test")
  async test(@Res() res: Response) {
    console.log("test");
    return res.json({ test: "test" });
  }

  // 전체 글 조회
  @Get("/list")
  async getEvent(@Res() res: Response) {
    const events = await this.eventService.getEvents();
    return res.render("eventMain.ejs", { events });
  }

  //게시글 조회
  @Get("/list/:eventPostId")
  async getEventById(
    @Res() res: Response,
    @Param("eventPostId") eventPostId: number,
  ) {
    const events = await this.eventService.getEventById(eventPostId);
    console.log(events.createdateAt);
    events.createdateAt = new Date(events.createdateAt);
    return res.render("eventDetail.ejs", { events });
  }

  // 게시글 수정
  @Patch("/list/:eventPostId/update")
  async updateUser(
    @Res() res: Response,
    @Param("eventPostId") eventPostId: number,
    @Request() req,
    @Body() data: UpdateEventDto,
  ) {
    const user: any = req.user;
    const events = await this.eventService.updateUser(eventPostId, {
      userId: data.userId,
      title: data.title,
      content: data.content,
      date: data.date,
    });

    return res.render("eventUpdate.ejs", { events });
  }

  // 수정  페이지 렌더링
  @Get("/list/:eventPostId/update")
  async getUpdateEvent(
    @Res() res: Response,
    @Param("eventPostId") eventPostId: number,
  ) {
    const events = await this.eventService.getEventById(eventPostId);
    return res.render("eventUpdate.ejs", { events });
  }

  @Delete("/list/:eventPostId/delete")
  async deleteArticle(
    @Res() res: Response,
    @Param("eventPostId") eventPostId: number,
    deleteEventDto: DeleteEventDto,
  ) {
    const deleteEvent = await this.eventService.deleteEvent(
      eventPostId,
      deleteEventDto,
    );
    return res.render("eventMain.ejs");
  }

  @Get("/search") ///검색
  async searchClubs(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query() term: string,
    @Res() res: Response,
  ) {
    const searchData = await this.searchService.paginatedResults(
      "events",
      page,
      term,
    );
    console.log("검색", searchData);
    return res.render("eventsearch.ejs", {
      term,
      ...searchData,
    });
  }
}
