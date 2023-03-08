import { Body, Controller, Get, Post, Render, Query, Res } from '@nestjs/common';
import { Request, Response} from 'express';
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
      console.log(terms, '컨트롤러 반환중')
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
  async create(
    @Body('title') createSearchDto: CreateSearchDto
    ) {
    console.log(createSearchDto, '컨트롤러');
    return await this.searchService.createArticle(createSearchDto);
  }
}

