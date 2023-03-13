import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get() // 메인페이지 바디
  mainpage(@Res() res: Response) {
    return res.render("index.ejs", {
      title: "스파르타 커뮤니티",
      name: "메인페이지",
      number: 5,
      job: "software engineer",
    });
  }

  @Get("signup")
  signup(@Res() res: Response) {
    return res.render("./sign/signup.ejs");
  }

  @Get("signin")
  signin(@Res() res: Response) {
    return res.render("./sign/signin.ejs")
  }

  @Get("findpassword")
  findpassword(@Res() res: Response) {
    return res.render("./sign/findpassword.ejs")
  }
}
