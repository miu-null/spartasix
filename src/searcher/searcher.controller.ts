import { Body, Controller, Get, Post, Query, Res, Param } from '@nestjs/common';
import { Request, Response} from 'express';
import { CreateSearchDto } from './dto/create.search.dto';
import { SearcherService } from './searcher.service';

@Controller("search")
export class SearcherController {
  constructor(

    private searchService: SearcherService
    ) {}


  @Get("posts")  // 통합 검색기능 
  async searchAllPosts(@Query() term, @Res() res: Response): Promise<void> {
    try {
      const terms = await this.searchService.findAllPosts(term);
      const events = terms.events
      const clubs = terms.clubs
      return res.render("searchAllPost.ejs", {
        title: "검색결과",
        events,
        clubs,
      });
      
    } catch (err) {
      console.error(err.message);
    }
  }
    
  @Get("posts1")  // 이벤트게시글 검색기능 
  async searchEventPosts(@Query() term, @Res() res: Response): Promise<void> {
    try {
      const terms = await this.searchService.findEventPosts(term);
      return res.render("searchEvent.ejs", {
        title: "검색결과",
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


  @Get("users")  // 유저 검색 기능, 
  async searchUsers(@Query() term, @Res() res: Response): Promise<void> {
    try {
      const terms = await this.searchService.findUsers(term);
      return res.render("userSearch.ejs", {
        title: "검색결과",
        terms,
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  @Post() // 테스트용 게시글 작성하기 기능
  async create(
    @Body() createSearchDto: CreateSearchDto
  ) {
    console.log(createSearchDto, '컨트롤러');
    return await this.searchService.Articlecreate(createSearchDto);
  }
}