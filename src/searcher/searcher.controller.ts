import { Body, Controller, Get, Post, Query, Res, Param, ParseIntPipe } from '@nestjs/common';
import { Request, Response} from 'express';
import { CreateSearchDto } from './dto/create.search.dto';
import { SearcherService } from './searcher.service';

@Controller("search")
export class SearcherController {
  constructor(

    private searchService: SearcherService
    ) {}


  @Get("posts")  // 통합 검색기능 
  async searchAllPosts(@Query() term,  @Res() res: Response): Promise<void> {

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

  // @Get("/users")  // 유저 검색 기능, 
  // async searchUsers(@Query() term, @Res() res: Response): Promise<void> {
  //   try {
  //     const terms = await this.searchService.findUsers(term);
  //     console.table(terms);
  //     return res.render("userSearch.ejs", {
  //       title: "검색결과",
  //       terms,
  //     });
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  @Get("/users")  // 유저 검색 기능, 페이지네이션 테스트
  async searchUsers1(
    @Query() term, 
    @Query('page') page, 
    @Query('limit') limit, 
    @Res() res: Response): Promise<void> {
  
    const lists = [
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
      { id: 3, name: 'User3' },
      { id: 4, name: 'User4' },
      { id: 5, name: 'User5' },
      { id: 6, name: 'User6' },
      { id: 7, name: 'User7' },
      { id: 8, name: 'User8' },
      { id: 9, name: 'User9' },
      { id: 10, name: 'User10' },
      { id: 11, name: 'User11' },
      { id: 12, name: 'User12' },
      { id: 13, name: 'User13' },
    ] 

    
    try {
      const Page = parseInt(page)
      const Limit = parseInt(limit)
      const startIndex = (Page - 1) * Limit
      const endIndex = Page * Limit

      const terms = await this.searchService.findUsers(term);
      console.log(terms, '--------------------------------')
 

      const results: any = {}

      if(endIndex < terms.length) {
      results.next = {
        Page: Page +1,
        Limit: Limit
      }
    }

      if(startIndex > 0 ) {
        results.previous = {
          Page: Page - 1,
          Limit: Limit
        }

      }



      // results.next = {}
      results.results = terms.slice(startIndex, endIndex)

      // results.next = {
      //   pages: pages + 1,
      //   limit: limit
      // }
      
      // //  = lists.slice(startIndex, endIndex)
      // return res.render("userSearch.ejs", {
      //   // title: "검색결과",
      //   // terms,
      //   // results
      // });

      res.json(results)
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