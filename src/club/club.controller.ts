import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  Req,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Render,
  UseGuards
} from "@nestjs/common";
import { ClubService } from "./club.service";
import { CreateClubDto } from "./dto/createclub.dto";
import { UpdateClubDto } from "./dto/updateclub.dto";
import { Response } from "express";
import { CreateAppDto } from "./dto/createApp.dto";
import { SearcherService } from "src/searcher/searcher.service";
import { ReportDefinition } from "aws-sdk/clients/cur";
import { reformPostDate, paginatedResults } from "../../views/static/js/filter"; //날짜처리, 페이지네이션
import { AuthGuard } from "@nestjs/passport";

@Controller("club")
export class ClubController {
  constructor(
    private readonly clubService: ClubService,
    private readonly searchService: SearcherService,
  ) { }

  //게시판 게시글 목록 조회
  @Get("/list")
  async getClubs(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Res() res: Response) {

    const clubs = await this.clubService.getClubs();     /// 게시글 목록 데이터
    const pagingposts = await paginatedResults(page, clubs)  // 페이지네이션 처리
    const sortPosts = await this.searchService.getPopularClubs(); ///인기글 조회
    
    return res.render("club.ejs", {
      ...pagingposts,
      sortPosts,
      reformPostDate,
    });
  }

  @Get("/clubspost")
  postclub(@Res() res: Response) {
    return res.render("clubspost.ejs");
  }

  @Post("/clubspost")
  @UseGuards(AuthGuard())
  async createClub(@Body() data: CreateClubDto, @Req() req) {
    const userId = req.user;
    const post = await this.clubService.createClub(
      userId,
      data.title,
      data.content,
      data.maxMembers,
      data.category,
    );
    return post;
  }

  // 신청서 작성
  @Post("/:id")
  @UseGuards(AuthGuard())
  async createApp(
    @Param("id") id: number,
    @Body() data: CreateAppDto,
    @Req() req,
  ) {
    const userId = req.user;
    const createNew = await this.clubService.createApp(
      id,
      userId,
      data.application,
      data.isAccepted,
    );
    return createNew;
  }

  @Get("/clubs/:id")
  async updateclub(@Res() res: Response) {
    return res.render("clubupdate.ejs");
  }

  @Put("/clubs/:id")
  @UseGuards(AuthGuard())
  async updateClub(
    @Param("id") id: number,
    @Body() data: UpdateClubDto,
    @Req() req,
  ) {
    const userId = req.user;
    const update = await this.clubService.updateClub(
      id,
      userId,
      data.title,
      data.content,
      data.maxMembers,
      data.category,
    );
    return update;
  }

  @Get("/list/:id")
  @Render('clubsdetail.ejs')
  async getClubsById(
    @Param("id") id: number,
    ) {
    const detail = await this.clubService.getClubById(id);
    const prevPost = detail.data.prevPost
    const nowPost = detail.data.nowPost
    const nextPost = detail.data.nextPost
    const comments = detail.comments
    const postSet = {prevPost, nowPost, nextPost, comments, reformPostDate}
    console.log("detail : ", comments)
    return {
      ...postSet,
      }
    };

  @Delete("/list/:id")
  @UseGuards(AuthGuard())
  async delete(@Param("id") id: number, @Req() req) {
    const userId = req.user;
    await this.clubService.deleteClub(userId, id);
    return true;
  }

  ///모임게시판 검색기능
  @Get("/search")
  async searchClubs(
    @Query("page") page: number,
    @Query() term: string,
    @Res() res: Response,
  ) {
    if (!page) {
      page = 1;
    }
    const searchData = await this.searchService.paginatedResults(
      "clubs",
      page,
      term,
    );
    return res.render("clubsearch.ejs", {
      term,
      ...searchData,
      reformPostDate
    });
  }
  // @Post("/list/report/:id")
  // async reportClub(
  //   @Param("id") id: number,
  //   @Body data: ReportClubDto,
  //   @Req() req,
  // ) {
  //   const userId = req.user;
  //   const reportPost = await this.clubService.reportClub(
  //     id,
  //     userId,
  //     clubId,
  //     reportReason,
  //     reportContent,
  //   );
  //   return reportPost;
  // }
}
