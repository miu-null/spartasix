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
} from "@nestjs/common";
import { ClubService } from "./club.service";
import { CreateClubDto } from "./dto/create-club.dto";
// import { DeleteClubDto } from "./dto/delete-club.dto";
import { UpdateClubDto } from "./dto/update-club.dto";
import { Request, Response } from 'express';

@Controller("club")
export class ClubController {
  constructor(private readonly clubService: ClubService) { }


  @Get("/clubs")
  async getClubs(@Res() res: Response) {
    const terms = await this.clubService.getClubs();
    console.log(terms);
    return res.render("club.ejs", {
      terms,
    });
  }

  @Get("/clubs/:clubId")
  async getClubsById(@Param("clubId") clubId: number) {
    return await this.clubService.getClubById(clubId);
  }

  @Post("/clubs")
  createClubs(@Body() data: CreateClubDto) {
    return this.clubService.createClub(
      data.userId,
      data.title,
      data.content,
      data.maxMembers,
    );
  }

  @Put("/clubs/:clubid")
  update(@Param("clubid") clubid: number, @Body() data: UpdateClubDto) {
    return this.clubService.updateClub(
      clubid,
      data.title,
      data.content,
      data.maxMembers,
    );
  }

  @Delete("clubs/:clubid")
  delete(@Param("clubid") clubid: number) {
    return this.clubService.deleteClub(clubid);
  }
}
