import { Body, Controller, Get, Post, Query, Res, ParseIntPipe, DefaultValuePipe, Render } from '@nestjs/common';
import { Response} from 'express';
import { CreateSearchDto } from './dto/create.search.dto';
import { SearcherService } from './searcher.service';


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
      const results = {events, clubs, users}

      return res.render("searchAll.ejs", {
        term,
        ...results
      })

    } catch (err) {
      console.error(err.message);
    }
  }
    
  @Get("posts1")  // 이벤트게시글 검색기능 
  async searchEventPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number,
    @Query() term,  
    @Res() res: Response): Promise<void> {
    try {
      const terms = await this.searchService.findEventPosts(term);
      return res.render("searchEvent.ejs", {
        terms,
      });

    } catch (err) {
      console.error(err.message);
    }
  }

  @Get("posts1")  // 클럽게시글 검색기능 
  async searchClubPosts(@Query() term, @Res() res: Response): Promise<void> {
    try {
      const terms = await this.searchService.findClubPosts(term);
      return res.render("searchClub.ejs", {
        title: "검색결과",
        terms,
      });
      
    } catch (err) {
      console.error(err.message);
    }
  }

  @Get("/users")  // 유저 검색 기능, 페이지네이션 테스트
  @Render('userSearch.ejs')
  async searchUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number,
    @Query() term,
    @Res() res: Response) {

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
