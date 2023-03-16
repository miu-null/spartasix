import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  Render,
  Next,
  Req,
} from "@nestjs/common";
import { ClubService } from "./club.service";
import { CreateClubDto } from "./dto/create-club.dto";
import { DeleteClubDto } from "./dto/delete-club.dto";
import { UpdateClubDto } from "./dto/update-club.dto";
import { Request, Response } from "express";
import { CreateAppDto } from "./dto/newApp-club.dto";


@Controller("club")
export class ClubController {
  constructor(private readonly clubService: ClubService) { }

  @Get("/list")
  async getClubs(@Res() res: Response, @Next() Next: Response) {
    const terms = await this.clubService.getClubs();
    console.log(terms);
    return res.render("club.ejs", {
      terms,
    });
  }
  // 신청서 작성
  @Post("/:clubId")
  async createApp(@Param("clubId") clubId: number, @Body() data: CreateAppDto) {
    console.log(data);
    const createNew = await this.clubService.newClubApp(clubId, {
      userId: data.userId,
      application: data.application,
      isAccepted: data.isAccepted,
    });
    return createNew;
  }
  // @Get("/:clubId")
  // async getClubsById(@Param("clubId") clubId: number) {
  //   return await this.clubService.getClubById(clubId);

  @Get("/list/:clubId")
  async getClubsById(
    @Param("clubId")
    clubId: number,
    @Res()
    res: Response,
  ) {
    const terms = await this.clubService.getClubs();
    const detail = await this.clubService.getClubById(clubId);
    console.log(detail);
    return res.render("clubsdetail.ejs", {
      detail,
      terms,
    });
  }
  // @Get("/clubs/:clubId")
  // async getClubsById(@Param("clubId") clubId: number) {
  //   return await this.clubService.getClubById(clubId);
  // }

  @Get("/clubspost")
  postclub(@Res() res: Response) {
    return res.render("clubspost.ejs");
  }

  @Post("/clubspost")
  createClubs(@Body() data: CreateClubDto, @Res() res) {
    const club = this.clubService.createClub(
      data.userId,
      data.title,
      data.content,
      data.maxMembers,
      // data.nickname,
    );
    return res.json(true);
  }

  @Put("/:clubId")
  update(@Param("clubid") clubid: number, @Body() data: UpdateClubDto) {
    return this.clubService.updateClub(
      clubid,
      data.title,
      data.content,
      data.maxMembers,
    );
  }

  @Delete("/list/:clubid")
  async delete(@Param("clubid") clubid: number, @Res() res) {
    const club = await this.clubService.deleteClub(clubid);
    return res.json(true);
  }
}
