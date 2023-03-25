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
  Render,
} from "@nestjs/common";
import { Response } from "express";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/createevent.dto";
import { UpdateEventDto } from "./dto/updateevent.dto";
import { remindEmailDto } from "./dto/remindevent.dto";
import { SearcherService } from "src/searcher/searcher.service";
import * as AWS from "aws-sdk";
import { FileInterceptor } from "@nestjs/platform-express";
import { reformPostDate, reformAllPostsDate } from "../../views/static/js/filter";


@Controller("events")
export class EventController {
  constructor(
    private eventService: EventService,
    private searchService: SearcherService,
  ) {}

  //이벤트 리마인드
  @Post("/remindEvent")
  async remindEvent(@Body() data: remindEmailDto, @Res() res) {
    const remindEvent = await this.eventService.remindEvent(
      data.email,
      data.startDate,
      data.endDate,
      data.title,
    )
    return res.json({ data: remindEvent });
  }

  //새글 쓰기
  @Post("/newevent")
  @UseInterceptors(FileInterceptor("file"))
  async createUser(
    @Req() req,
    @Res() res: Response,
    @Body() data: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('controller test')
    console.log("newevent req:::::",req)
    console.log("newevent req end:::::")
    console.log("datatitle:::::",data.title)
    console.log("file:::::",file)

    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const key = `${Date.now() + file.originalname}`;
    // AWS 객체 생성
    const upload = await new AWS.S3()
      .putObject({
        Key: key,
        Body: file.buffer,
        Bucket: process.env.AWS_BUCKET_NAME,
        ACL: "public-read",
      })
      .promise();

    const postIMG = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;

    console.log("upload::::::",upload)
    console.log("postIMG::::::",postIMG)

    Object.assign({
      statusCode: 201,
      message: `이미지 등록 성공`,
      data: { url: postIMG },
    });

    const userId = req.user;
    console.log('글작성시 userId:::::::',userId)

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

  // 작성 페이지 렌더링
  @Get("/newevent")
  async getNewEvent(@Res() res: Response) {
    return res.render("eventNew.ejs");
  }

  // 전체 글 조회
  @Get("/list")
  async getEvent(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Res() res: Response,
  ) {
    const events = await this.eventService.getEvents(page);
    const sortPosts = await this.searchService.getPopularEvents()
    return res.render("eventMain.ejs", {
       ...events,
       sortPosts,
       reformPostDate
      });
  }

  //게시글 상세 조회
  @Get("/list/:id")
  @Render("eventDetail.ejs")
  async getEventById(
    @Res() res: Response,
    @Param("id") id: number,
  ) {
    let postDetail = await this.eventService.getEventById(id);
    const events = postDetail.data.nowPost
    let imgUrl = events.postIMG;
    events.createdAt = new Date(events.createdAt);
    const prevPost = postDetail.data.prevPost
    const nowPost = postDetail.data.nowPost
    const nextPost = postDetail.data.nextPost
    const comments = postDetail.comments
    const postSet = {prevPost, nowPost, nextPost, comments, reformPostDate}
    console.log("comments : ", comments)
    
    return {events, imgUrl, nextPost, nowPost, prevPost, comments };
  }

  // 수정 페이지 렌더링
  @Get("/list/:id/updatepage")
  async getUpdateEvent(
    @Res() res: Response,
    @Param("id") id: number,
  ) {
    const events = await this.eventService.getEventById(id);
    const event = events.data.event
    let imgUrl = event.postIMG
    console.log('imgUrl:::::',imgUrl)
    console.log(':::::::in update controller::::::::')
    console.log('id:::::',id)
    return res.render("eventUpdate.ejs", { events,event});
  }

  // 게시글 수정
  @Patch("/list/:id/update")
  @UseInterceptors(FileInterceptor("file"))
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
    // AWS 객체 생성
    const upload = await new AWS.S3()
      .putObject({
        Key: key, //경로
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
      postIMG:postIMG
    });
    console.log('수정하기페이지!!!!!!!!!!!')
    console.log('userId',userId,'postIMG',postIMG)

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
    if (!page) {
      page = 1;
    }
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
