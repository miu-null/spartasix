import { Controller, Get,  Query, Res, ParseIntPipe, DefaultValuePipe, Render} from '@nestjs/common';
import { Response} from 'express';
import { SearcherService } from './searcher.service';
import { reformPostDate } from "../../views/static/js/filter";

@Controller("search")
export class SearcherController {
  constructor(
    private searchService: SearcherService,
    ) {}
    
  @Get("all")  // 통합 검색기능 
  async searchAllPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number,
    @Query() term,  
    @Res() res: Response): Promise<void> {
    try {
      const terms = await this.searchService.findAllPosts(term);
      const events = terms.events
      const clubs = terms.clubs
      const users = terms.users
      const results = {term, events, clubs, users, reformPostDate}

      const popularPosts = await this.searchService.getPopularPosts(); //인기글
      return res.render("searchAll.ejs", {
        ...results,
        ...popularPosts,
        popularPosts,
      })
    } catch (err) {
      console.error(err.message);
    }
  }

  @Get("users")  // 유저 검색 기능, 페이지네이션 테스트
  @Render('userSearch.ejs')
  async searchUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number,
    @Query() term
    ) {

    try {
      const userData = await this.searchService.paginatedResults('users', page, term)
      return {
        term,
        page,
        ...userData
      };
    } catch (err) {
      console.error(err.message);
    }
  }
}