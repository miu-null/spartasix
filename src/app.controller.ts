import { Controller, Get, Req, Res } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class AppController {
  @Get("/") // 메인페이지 바디
  mainpage(@Res() res: Response) {
    return res.render("mainbody");
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
