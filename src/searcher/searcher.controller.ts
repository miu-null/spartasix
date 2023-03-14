import { Body, Controller, Get, Post, Query, Res, Param, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
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
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number,
    @Query('take', new DefaultValuePipe(3), ParseIntPipe) take:number,
    @Res() res: Response): Promise<void> {
  
    try {
      const findData = await this.searchService.findUsers(term);

      const numOfResults = findData.length;  //불러온 데이터 목록 수
      const startIndex = (page - 1) * take

      const sliceData = findData.slice(startIndex, startIndex + take)  // 페이지당 조회할 데이터 리스트
      const numOfPages = Math.ceil(numOfResults / take)   //생성될 페이지 수

      const unitSize = 3 // 페이지 묶음 단위 < 1 2 3>  <4 5 6> 
      const numOfUnits = Math.floor((page -1) / unitSize)  //<1 2 3> 페이지는 0 번째
      const unitStart = numOfUnits * unitSize + 1
      const unitEnd = unitStart + (unitSize - 1)

      return res.render("userSearch.ejs", {
        title: "검색결과",
        term,

        sliceData,
        take,
        numOfPages,
        unitStart,
        unitEnd,
        page,
      });
    } catch (err) {
      console.error(err.message);
    }
  }

//필요한 것




  @Post() // 테스트용 게시글 작성하기 기능
  async create(
    @Body() createSearchDto: CreateSearchDto
  ) {
    console.log(createSearchDto, '컨트롤러');
    return await this.searchService.Articlecreate(createSearchDto);
  }
}