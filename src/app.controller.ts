import { Controller, Get, Res} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // 메인페이지 바디
    root(@Res() res: Response) {
      return res.render('index.ejs', {title : '공사중', name: '6-Galic', number: 5, job: 'software engineer'})
    }
  
  @Get('search')
    hello(@Res() res: Response) {
      // return { id : terms.name, age : terms.age}
    return res.render('search.ejs', {name: '김바다', age: 5})
    }
  }  
