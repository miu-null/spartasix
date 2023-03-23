import { Controller, Get, Inject, Res, Render} from "@nestjs/common";
import { Response } from "express";
import { SearcherService } from "./searcher/searcher.service";

@Controller()
export class AppController {
  constructor(@Inject(SearcherService)
    private readonly SearcherService: SearcherService

  ) {}

  @Get("/") // 메인페이지 바디
  @Render("mainbody")
  async mainpage(@Res() res: Response) {
    const posts = this.SearcherService.getPopularPosts()
    return posts 
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
    return res.render("userinfo")
  }
}
