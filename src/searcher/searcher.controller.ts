import { Body, Controller, Get, Post, Render, Query, Res } from '@nestjs/common';
import { Request, Response} from 'express';
import { CreateSearchDto } from './dto/create.search.dto';
import { Searcher } from '../entities/searcher.entity';
import { SearcherService } from './searcher.service';
import { UserSearchService } from './searcher.service';



@Controller("search")
export class SearcherController {
  constructor(
    private searchService: SearcherService,
    private userService: UserSearchService, 
    ) {}

  @Get("posts")
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

  @Get("users")
  async searchUsers(@Query() term, @Res() res: Response): Promise<void> {
    try {
      const terms = await this.userService.findusers(term);
      console.log(terms, '컨트롤러 반환중')
      return res.render("userSearchTest.ejs", {
        title: "검색결과",
        terms,
      });
    } catch (err) {
      console.error(err.message);
    }
  }



  @Post() 
  async create(
    @Body() createSearchDto: CreateSearchDto
    ) {
    console.log(createSearchDto, '컨트롤러');
    return await this.searchService.Articlecreate(createSearchDto);
  }
}