import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class AppController {
  @Get("/") // 메인페이지 바디
  mainpage(@Res() res: Response) {
    return res.render("main.ejs");
  }

  @Get("sign")
  signin(@Res() res: Response) {
    return res.render("./templates/sign/sign");
  }

  @Get("find_id_password")
  findpassword(@Res() res: Response) {
    return res.render("./templates/sign/findpassword");
  }
}
