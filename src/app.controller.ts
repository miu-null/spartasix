import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async view() {
    return { title : '공사중', name: '6-Galic', number: 5, job: 'software engineer'};
  }
}
