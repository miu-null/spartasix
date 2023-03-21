import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  Next,
  Req,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from "@nestjs/common";
import { ClubService } from "./club.service";
import { CreateClubDto } from "./dto/createclub.dto";
import { UpdateClubDto } from "./dto/updateclub.dto";
import { Response } from "express";
import { CreateAppDto } from "./dto/createApp.dto";
import { SearcherService } from "src/searcher/searcher.service";

@Controller("club")
export class ClubController {
  constructor(
    private readonly clubService: ClubService,
    private readonly searchService: SearcherService,
  ) { }

  @Get("/list")
  async getClubs(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Res() res: Response) {

    const terms = await this.clubService.paginatedResults(page);
    console.log(terms)
    return res.render("club.ejs", {
      ...terms,
    });
  }

  @Get("/clubspost")
  postclub(@Res() res: Response) {
    return res.render("clubspost.ejs");
  }

  @Post("/clubspost")
  async createClub(@Body() data: CreateClubDto, @Req() req) {
    const userId = req.user;
    const post = await this.clubService.createClub(
      userId,
      data.title,
      data.content,
      data.maxMembers,
    );
    return post;
  }

  // 신청서 작성
  @Post("/:id")
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
    );
    return update;
  }

  @Get("/list/:id")
  async getClubsById(
    @Param("id")
    id: number,
    @Res()
    res: Response,
  ) {
    const terms = await this.clubService.getClubs();
    const detail = await this.clubService.getClubById(id);
    console.log(detail);
    return res.render("clubsdetail.ejs", {
      detail,
      terms,
    });
  }

  @Delete("/list/:id")
  async delete(@Param("id") id: number, @Res() res) {
    const club = await this.clubService.deleteClub(id);
    return res.json(true);
  }

  ///모임게시판 검색기능
  @Get("/search")
  async searchClubs(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query() term: string,
    @Res() res: Response,
  ) {
    const searchData = await this.searchService.paginatedResults(
      "clubs",
      page,
      term,
    );
    console.log("검색", searchData);
    return res.render("clubsearch.ejs", {
      term,
      ...searchData,
    });
  }
}
