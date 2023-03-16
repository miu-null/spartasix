import { Body, Controller, Get, Post, Query, Res, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { Response} from 'express';
import { CreateSearchDto } from './dto/create.search.dto';
import { SearcherService } from './searcher.service';
import { ClubService } from 'src/club/club.service';


@Controller("search")
export class SearcherController {
  constructor(
    private searchService: SearcherService,
    private clubService : ClubService
    ) {}

  @Get("posts")  // 통합 검색기능 
  async searchAllPosts(@Query() term,  @Res() res: Response): Promise<void> {
    try {
      const terms = await this.searchService.findAllPosts(term);
      const events = terms.events
      const clubs = terms.clubs

      if (clubs || events) {
        return res.render("searchAllPost.ejs", {
          title: "검색결과가 없습니다.",
          events,
          clubs,
        });
      } else {
        return res.render("searchAllPost.ejs", {
          title: "검색결과",
          events,
          clubs,
        })}

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


  @Get("/users")  // 유저 검색 기능, 페이지네이션 테스트
  async searchUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number,
    @Query() term,
    @Res() res: Response): Promise<void> {

    try {
      const userData = await this.paginatedResults('', page, term)
      return res.render("userSearch.ejs", {
        title: "검색결과",
        term,
        page,
        ...userData
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  @Get("/clubs")  // 
  async searchClubs(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number,
    @Query() term,
    @Res() res: Response): Promise<void> {

    try {
      const clubsData = await this.paginatedResults('clubs', page)

      return res.render("clubtest.ejs", {
        title: "검색결과",
        term,
        page,
        ...clubsData
      });
    } catch (err) {
      console.error(err.message);
    }
  }
  
  //페이지네이션 적용 전, 게시판 및 유저 데이터 선택
  async selectData(@Query() pageType : any, term : string=null) {
    let getdata
    if (pageType === 'users') {
      getdata = await this.searchService.findUsers(term);
    } else if (pageType === 'events') {
      getdata = await this.searchService.findEventPosts(term);
    } else if (pageType === 'events') {

    } else if (pageType === 'events') {

    } else if (pageType === 'events') {

    } else (pageType === 'clubs') 
      getdata = await this.clubService.getClubs(); //테스트용 
    
    return getdata;
  }

  //페이지네이션용 함수
async paginatedResults(@Query() pageType :any, page:number, term : string=null) {
      const take:number = 4
      const seletedData = await this.selectData(pageType)

      const totalDataCount = seletedData.length;  //불러온 데이터 목록 수
      const startIndex = (page - 1) * take
      const endIndex = page * take

      const slicedData = seletedData.slice(startIndex, endIndex)  // 페이지당 조회할 데이터 묶음
      const lastPage = Math.ceil(totalDataCount / take)   //생성될 페이지 수

      const unitSize = 3 // 페이지 묶음 단위 : 3개씩 < 1 2 3>  <4 5 6> 
      const numOfUnits = Math.floor((page  - 1) / unitSize)  //<1 2 3> 페이지는 0 번째 index
      const unitStart = numOfUnits * unitSize + 1  //0번째 묶음의 시작은 1페이지, 1번째 묶음 시작은 4페이지...
      const unitEnd = unitStart + (unitSize - 1) //0번째 묶음의 끝은 3페이지, 1번째 묶음 끝은 6페이지
      
      return {
        page,
        slicedData, 
        lastPage,
        unitStart,
        unitEnd,
      };
  }


  

  @Post() // 테스트용 게시글 작성하기 기능
  async create(
    @Body() createSearchDto: CreateSearchDto
  ) {
    console.log(createSearchDto, '컨트롤러');
    return await this.searchService.Articlecreate(createSearchDto);
  }

}
