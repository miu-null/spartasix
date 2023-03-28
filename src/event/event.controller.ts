import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  Delete,
  Patch,
  Res,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Req,
  UploadedFile,
  UseInterceptors,
  Render,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/createevent.dto";
import { UpdateEventDto } from "./dto/updateevent.dto";
import { remindEmailDto } from "./dto/remindevent.dto";
import { SearcherService } from "src/searcher/searcher.service";
import * as AWS from "aws-sdk";
import { FileInterceptor } from "@nestjs/platform-express";
import { reformPostDate, paginatedResults } from "../../views/static/js/filter";
import { AuthGuard } from "@nestjs/passport";
import { OptionalAuthGuard } from '../auth/optional-auth.guard';

@Controller("events")
export class EventController {
  constructor(
    private eventService: EventService,
    private searchService: SearcherService,
  ) {}

  @Post("/remindEvent")
  async remindEvent(@Body() data: remindEmailDto, @Res() res) {
    const remindEvent = await this.eventService.remindEvent(
      data.email,
      data.startDate,
      data.endDate,
      data.title,
    );
    return res.json({ data: remindEvent });
  }

  @Post("/newevent")
  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(AuthGuard())
  async createUser(
    @Req() req,
    @Res() res: Response,
    @Body() data: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const key = `${Date.now() + file.originalname}`;
    const upload = await new AWS.S3()
      .putObject({
        Key: key,
        Body: file.buffer,
        Bucket: process.env.AWS_BUCKET_NAME,
        ACL: "public-read",
      })
      .promise();

    const postIMG = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;

    Object.assign({
      statusCode: 201,
      message: `이미지 등록 성공`,
      data: { url: postIMG },
    });

    const userId = req.user;

    const event = await this.eventService.createEvent(
      userId,
      data.title,
      data.content,
      data.startDate,
      data.endDate,
      postIMG,
    );
    return res.json(true);
  }

  @Get("/newevent")
  async getNewEvent(@Res() res: Response) {
    return res.render("eventNew.ejs");
  }

  @Get("/list")
  async getEvent(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Res() res: Response,
  ) {
    const events = await this.eventService.getEvents();
    const pagingposts = await paginatedResults(page, events);
    const sortPosts = await this.searchService.getPopularEvents();

    return res.render("eventMain.ejs", {
      ...pagingposts,
      sortPosts,
      reformPostDate,
    });
  }

  @Get("/list/:id")
  @UseGuards(OptionalAuthGuard)
  @Render("eventDetail.ejs")
  async getEventById(
    @Res() res: Response, 
    @Param("id") id: number,
    @Req() req
    ) {
      let buttonUserId = null;
      if(req.user) {
        buttonUserId = req.user
      }
    let postDetail = await this.eventService.getEventById(id);
    const events = postDetail.data.nowPost;
    let imgUrl = events.postIMG;
    events.createdAt = new Date(events.createdAt);
    const prevPost = postDetail.data.prevPost;
    const nowPost = postDetail.data.nowPost;
    const nextPost = postDetail.data.nextPost;
    const comments = postDetail.comments;
    const postSet = { prevPost, nowPost, nextPost, comments, reformPostDate };

    return {
      events,
      imgUrl,
      nextPost,
      nowPost,
      prevPost,
      comments,
      reformPostDate,
      buttonUserId
    };
  }

  @Get("/list/:id/updatepage")
  async getUpdateEvent(@Res() res: Response, @Param("id") id: number) {
    const events = await this.eventService.getEventById(id);
    const event = events.data.event;
    let imgUrl = event.postIMG;

    return res.render("eventUpdate.ejs", { events, event });
  }

  @Patch("/list/:id/update")
  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(AuthGuard())
  async updateEvent(
    @Param("id") id: number,
    @Req() req,
    @Body() data: UpdateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    const key = `${Date.now() + file.originalname}`;
    const upload = await new AWS.S3()
      .putObject({
        Key: key,
        Body: file.buffer,
        Bucket: process.env.AWS_BUCKET_NAME,
        ACL: "public-read",
      })
      .promise();
    const postIMG = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;

    const userId = req.user;
    const events = await this.eventService.updateEvent(id, {
      userId,
      title: data.title,
      content: data.content,
      startDate: data.startDate,
      endDate: data.endDate,
      postIMG: postIMG,
    });

    return events;
  }

  @Delete("/list/:eventPostId")
  @UseGuards(AuthGuard())
  async deleteArticle(@Param("eventPostId") eventPostId: number) {
    const deleteEvent = await this.eventService.deleteEvent(eventPostId);
    return true;
  }

  @Get("/search")
  async searchClubs(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query() term: string,
    @Res() res: Response,
  ) {
    if (!page) {
      page = 1;
    }
    const searchData = await this.searchService.paginatedResults(
      "events",
      page,
      term,
    );

    return res.render("eventsearch.ejs", {
      term,
      ...searchData,
      reformPostDate,
    });
  }
}
