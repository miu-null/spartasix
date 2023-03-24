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
import * as multerS3 from 'multer-s3';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';



@Controller("events")
export class EventController {
  constructor(
    private eventService: EventService,
    private searchService: SearcherService,
  ) { }

  //이벤트 리마인드
  @Post("/remindEvent")
  async remindEvent(@Body() data: remindEmailDto, @Res() res) {
    console.log(data)
    const remindEvent = await this.eventService.remindEvent(
      data.email,
      data.startDate,
      data.endDate,
      data.title,
    )
    return res.json({ data: remindEvent })
  }

  //글 생성
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
    console.log("data:::::",data)
    console.log("file:::::",file)
    
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    console.log('uploadedFile:', file, 'originalname:', file.originalname)
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
    
    console.log("upload::::::",upload)
    console.log("postIMG::::::",postIMG)


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

  // 이벤트 작성 페이지 렌더링
  @Get("/newevent")
  async getNewEvent(@Res() res: Response) {
    return res.render("eventNew.ejs");
  }

  // 전체 이벤트 조회
  @Get("/list")
  async getEvent(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Res() res: Response) {
    const events = await this.eventService.getEvents(page);
    console.log("events : ", events)
    return res.render("eventMain.ejs", { ...events });
  }

  //특정 이벤트 조회 페이지
  @Get("/list/:id")
  async getEventById(
    @Res() res: Response,
    @Param("id") id: number,
  ) {
    const events = await this.eventService.getEventById(id);
    console.log(events)
    events.createdAt = new Date(events.createdAt);

    const eventInfo = await this.eventService.getEventById(id)
    let imgUrl = eventInfo.postIMG;
    console.log('imgUrl:::::',imgUrl)

    return res.render("eventDetail.ejs", { events,imgUrl });
  }


  // 이벤트 수정 페이지 렌더링
  @Get("/list/:id/updatepage")
  async getUpdateEvent(
    @Res() res: Response,
    @Param("id") id: number,
  ) {
    const eventInfo = await this.eventService.getEventById(id)
    let imgUrl = eventInfo.postIMG;
    console.log('imgUrl:::::',imgUrl)

    const events = await this.eventService.getEventById(id);
    return res.render("eventUpdate.ejs", { events,imgUrl });
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

    console.log(':::::::in update controller::::::::')
    console.log('id:::::',id)

 


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

    return events;
  }

  @Delete("delete/list/:id")
  async deleteArticle(@Param("id") id: number) {
    const deleteEvent = await this.eventService.deleteEvent(id);
    return true;
  }

  @Get("/search") ///검색
  async searchClubs(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query() term: string,
    @Res() res: Response,
  ) {
    const searchData = await this.searchService.paginatedResults("events", page, term,);
    console.log("검색", searchData);
    return res.render("eventsearch.ejs", {
      term,
      ...searchData,
    });
  }
}