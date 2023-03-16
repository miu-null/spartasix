import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create.search.dto';
import { SearcherRepository } from './searcher.repositoy';
import { ClubService } from 'src/club/club.service';

@Injectable()
export class SearcherService {
    searchArticle(createSearchDto: CreateSearchDto) {
    throw new Error('Method not implemented.');
  }
    constructor(
        private SearcherRepository: SearcherRepository,
        private clubService : ClubService
        ) {}  

    
    //게시글 통합검색
    async findAllPosts(term : any) {;
        console.log(term, '서비스')
        const results = await this.SearcherRepository.findAllPosts(term);
        console.log(term, '서비스 통과')
        return results
    }

    //이벤트  게시글검색
    async findEventPosts(term : any) {
        console.log(term, '서비스 진입')
        const results = await this.SearcherRepository.findEventPosts(term);
        console.log(term, '서비스 반환')
        return results
    }

    //모임 게시글 검색
    async findClubPosts(term : any) {
        console.log(term, '서비스')
        const results = await this.SearcherRepository.findClubPosts(term);
        console.log(term, '서비스 반환')
        return results
    }

    // 유저 검색
    async findUsers(term: any) {
        console.log(term, '서비스')
        const results = await this.SearcherRepository.findUsers(term);
        console.log(term, '서비스 반환')
        return results
    }

    // 유저 검색
    async findUsersCount(term: any) {
        console.log(term, '서비스')
        const results = await this.SearcherRepository.findUsersCount(term);
        console.log(term, '서비스 반환')
        return results
    }


    //테스트용 게시글 생성
    async Articlecreate(createSearchDto: CreateSearchDto) {
        const { title, content } = createSearchDto
        const article = {
            title,
            content,
            createdAt: new Date(),
        }
        console.log('크리에이트, 서비스', article, title);
        return await this.SearcherRepository.ArticleCreate(createSearchDto)
    }
    
          //페이지네이션 적용 전, 게시판 및 유저 데이터 선택
          async selectData(pageType : string, page: number, term : any=null) {
            let getdata
            if (pageType === 'users') {
                getdata = await this.SearcherRepository.findUsers(term);
            } else if (pageType === 'events') {
                getdata = await this.SearcherRepository.findEventPosts(term);
            } else if (pageType === 'clubs') {
                getdata = await this.SearcherRepository.findClubPosts(term);
            } else if (pageType === 'allposts') {
    
            } else if (pageType === 'clubs') {
                getdata = await this.clubService.getClubs(); //테스트용 
            } else (pageType === '') 
    
        
        return getdata;
        }
    
        //페이지네이션용 함수
        async paginatedResults(pageType : string, page:number, term: string=null) {
            const take:number = 4
            const seletedData = await this.selectData(pageType, page, term)
    
            const totalDataCount = seletedData.length;  //불러온 데이터 목록 수
            const startIndex = (page - 1) * take
            const endIndex = page * take
    
            const slicedData = seletedData.slice(startIndex, endIndex)  // 페이지당 조회할 데이터 묶음
            const lastPage = Math.ceil(totalDataCount / take)   //생성될 페이지 수
    
            const unitSize = 3 // 페이지 묶음 단위 : 3개씩 < 1 2 3>  <4 5 6> 
            const numOfUnits = Math.floor((page  - 1) / unitSize)  //<1 2 3> 페이지는 0 번째 index
            const unitStart = numOfUnits * unitSize + 1  //0번째 묶음의 시작은 1페이지, 1번째 묶음 시작은 4페이지...
            const unitEnd = unitStart + (unitSize - 1) //0번째 묶음의 끝은 3페이지, 1번째 묶음 끝은 6페이지
            const paginatedDemand = {page, slicedData, lastPage, unitStart, unitEnd,};
    
            return {
            ...paginatedDemand
            };
    }
    
    
}

