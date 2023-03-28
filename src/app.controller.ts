import { Controller, Get, Inject, Res, Render } from "@nestjs/common";
import { Response } from "express";
import { SearcherService } from "./searcher/searcher.service";
import { reformPostDate } from "../views/static/js/filter";

@Controller()
export class AppController {
  constructor(
    @Inject(SearcherService)
    private readonly searchService: SearcherService,
  ) {}

  @Get("/")
  @Render("mainbody")
  async mainpage(@Res() res: Response) {
    const sortPosts = await this.searchService.getPopularPosts();
    const usersRank = await (await this.searchService.getUserRank()).slice(0, 5)
    console.log(usersRank)
    return {
      sortPosts,
      reformPostDate,
      usersRank
    };
  }

  @Get("sign")
  signin(@Res() res: Response) {
    return res.render("sign");
  }

  @Get("find_id_password")
  findpassword(@Res() res: Response) {
    return res.render("findpassword");
  }

  @Get("comment")
  comment(@Res() res: Response) {
    return res.render("comment");
  }

  @Get("mypage")
  mypage(@Res() res: Response) {
    return res.render("userinfo");
  }
}
