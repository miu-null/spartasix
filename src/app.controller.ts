import { Controller, Get, Inject, Res, Render, UseGuards, Req } from "@nestjs/common";
import { Response } from "express";
import { SearcherService } from "./searcher/searcher.service";
import { reformPostDate } from "../views/static/js/filter";
import { OptionalAuthGuard } from './auth/optional-auth.guard';

@Controller()
export class AppController {
  constructor(
    @Inject(SearcherService)
    private readonly searchService: SearcherService,
  ) {}

  @Get("/")
  @UseGuards(OptionalAuthGuard)
  @Render("mainbody")
  async mainpage(
    @Req() req) {
      let buttonUserId = null;
      if (req.user) {
        buttonUserId = req.user;
      }
    const sortPosts = await this.searchService.getPopularPosts();
    const usersRank = await (await this.searchService.getUserRank()).slice(0, 5)
    console.log(buttonUserId)
    return {
      sortPosts,
      reformPostDate,
      usersRank,
      buttonUserId
    };
  }

  @Get("sign")
  @UseGuards(OptionalAuthGuard)
  signin(
    @Res() res: Response,
    @Req() req
    ) {
    let buttonUserId = null;
    if (req.user) {
      buttonUserId = req.user;
    }
    return res.render("sign", {buttonUserId});
  }

  @Get("find_id_password")
  @UseGuards(OptionalAuthGuard)
  findpassword(
    @Res() res: Response,
    @Req() req
    ) {
    let buttonUserId = null;
    if (req.user) {
      buttonUserId = req.user;
    }
    return res.render("findpassword");
  }

  @Get("comment")
  comment(@Res() res: Response) {
    return res.render("comment");
  }

  @Get("mypage")
  @UseGuards(OptionalAuthGuard)
  mypage(
    @Res() res: Response,
    @Req() req
    ) {
    let buttonUserId = null;
    if (req.user) {
      buttonUserId = req.user;
    }
    return res.render("userinfo");
  }
}
