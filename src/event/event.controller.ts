import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  Delete,
  Patch,
  Request,
  Res,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Req,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { Response } from "express";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/createevent.dto";
import { UpdateEventDto } from "./dto/updateevent.dto";
import { remindEmailDto } from "./dto/remindevent.dto";
import { SearcherService } from "src/searcher/searcher.service";
import * as AWS from "aws-sdk";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("events")
export class EventController {
  constructor(
    private eventService: EventService,
    private searchService: SearcherService,
  ) {}

   //이벤트 리마인드
   @Post("/remindEvent")
   async remindEvent(@Body() data:remindEmailDto, @Res() res ){
     const remindEvent = await this.eventService.remindEvent(
       data.email,
       data.postIMG,
       data.startDate,
       data.endDate,
       data.title,
     )
     return res.json({data:remindEvent})
   }

  //글 생성
  @Post("/newevent")
  @UseInterceptors(FileInterceptor("postIMG"))
  async createUser(
    @Req() req,
    @Res() res: Response,
    @Body() data: CreateEventDto,
    @UploadedFile() uploadedFile: Express.Multer.File,
  ) {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    console.log('uploadedFile:', uploadedFile,'originalname:',uploadedFile.originalname)

    const key = `${Date.now() + uploadedFile.originalname}`;
    // AWS 객체 생성
    const upload = await new AWS.S3()
      .putObject({
        Key: key,
        Body: uploadedFile.buffer,
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

    const userId = req.userId;
    const event = await this.eventService.createEvent(
      userId,
      data.title,
      data.content,
      data.startDate,
      data.endDate,
      data.postIMG,
    );
    return res.json(true);
  }

  // 작성 페이지 렌더링
  @Get("/newevent")
  async getNewEvent(@Res() res: Response) {
    return res.render("eventNew.ejs");
  }

  // 전체 글 조회
  @Get("/list")
  async getEvent(@Res() res: Response) {
    const events = await this.eventService.getEvents();
    console.log("events : " + JSON.stringify(events))
    return res.render("eventMain.ejs", { events });
  }

  //게시글 조회
  @Get("/list/:eventPostId")
  async getEventById(
    @Res() res: Response,
    @Param("eventPostId") eventPostId: number,
  ) {
    const events = await this.eventService.getEventById(eventPostId);
    events.createdateAt = new Date(events.createdateAt);

    return res.render("eventDetail.ejs", { events });
  }
 

  // 수정 페이지 렌더링
  @Get("/list/:eventPostId/update")
  async getUpdateEvent(
    @Res() res: Response,
    @Param("eventPostId") eventPostId: number,
  ) {
    const events = await this.eventService.getEventById(eventPostId);
    return res.render("eventUpdate.ejs", { events });
  }

  // 게시글 수정
  @Patch("/list/:eventPostId/update")
  async updateEvent(
    @Param("eventPostId") eventPostId: number,
    @Req() req,
    @Body() data: UpdateEventDto,
  ) {
    const userId = req.user;
    const events = await this.eventService.updateEvent(eventPostId, {
      userId,
      title: data.title,
      content: data.content,
      startDate:data.startDate,
      endDate:data.endDate,
      postIMG: data.postIMG
    });

    return events;
  }

  @Delete("/list/:eventPostId")
  async deleteArticle(@Param("eventPostId") eventPostId: number) {
    const deleteEvent = await this.eventService.deleteEvent(eventPostId);
    return true;
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
