import { Controller, Get, Render, Res} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
    root(@Res() res: Response) {
      return res.render('main.ejs', {title : '공사중', name: '6-Galic', number: 5, job: 'software engineer'})
    }
}
