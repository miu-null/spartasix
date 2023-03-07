import { Body, Controller, Res, Get, Param, Post, Req, Query } from '@nestjs/common';
import { Request, Response } from 'express'
import { CreateSearchDto } from './dto/create.search.dto';
import { Searcher } from './entity/searcher.entity';
import { SearcherService } from './searcher.service';

@Controller("search")
export class SearcherController {
  constructor(private searchService: SearcherService) {}

  @Get()
  async searchEventPosts(@Query() term, @Res() res: Response): Promise<void> {
    try {
      const terms = await this.searchService.findEventPosts(term);
      return res.render("search.ejs", {
        title: "검색결과",
        terms,
      });
    } catch (err) {
      console.error(err.message);
    }
  }
  // @Get()
  // findAll() : Promise<Searcher[]> {
  //     return this.searchService.findAll();
  // }

  //   @Get()
  //   findOne(@Param("id") id: number): Promise<Searcher[]> {
  //     return this.searchService.findOne(id);
  //   }

  @Post() 
  async create(@Body() CreateSearchDto: CreateSearchDto): Promise<Searcher> {
    console.log(CreateSearchDto, '컨트롤러');
    return await this.searchService.create(CreateSearchDto);
  }
}

