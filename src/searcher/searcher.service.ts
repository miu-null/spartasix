import { Injectable } from '@nestjs/common';
import { SearcherRepository } from './searcher.repositoy';
import { isSameDay} from 'date-fns'
import { format, utcToZonedTime } from 'date-fns-tz'; 
import koLocale from 'date-fns/locale/ko';

@Injectable()
export class SearcherService {
    constructor(
        private SearcherRepository: SearcherRepository,

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
    
    //페이지네이션 적용 전, 게시판 및 유저 데이터 선택
    async selectData(pageType : string, page:number, term : any) {
        let getdata
        if (pageType === 'users') {
            getdata = await this.SearcherRepository.findUsers(term);
        } else if (pageType === 'events') {
            getdata = await this.SearcherRepository.findEventPosts(term);
        } else if (pageType === 'clubs') {
            getdata = await this.SearcherRepository.findClubPosts(term);
        } else {
        } return getdata;
    }
    
    //페이지네이션용 함수
    async paginatedResults(pageType : string, page, term: string) {
        const take: number = 5;
        const seletedData = await this.selectData(pageType, page, term);
        const searchCount = seletedData.length

        const totalDataCount = seletedData.length; //불러온 데이터 목록 수
        const startIndex = (page - 1) * take;
        const endIndex = page * take;

        const slicedData = seletedData.slice(startIndex, endIndex); // 페이지당 조회할 데이터 묶음
        const lastPage = Math.ceil(totalDataCount / take); //생성될 페이지 수

        const unitSize = 3; // 페이지 묶음 단위 : 3개씩 < 1 2 3>  <4 5 6>
        const numOfUnits = Math.floor((page - 1) / unitSize); //<1 2 3> 페이지는 0 번째 index
        const unitStart = numOfUnits * unitSize + 1; //0번째 묶음의 시작은 1페이지, 1번째 묶음 시작은 4페이지...
        const unitEnd = unitStart + (unitSize - 1); //0번째 묶음의 끝은 3페이지, 1번째 묶음 끝은 6페이지
        const paginatedDemand = {page, slicedData, lastPage, unitStart, unitEnd, searchCount};

        return {
        ...paginatedDemand,
        };
    }

    //인기글 관련 : 모든 게시글
    async getAllPosts() {
          const posts = await this.SearcherRepository.getAllPosts();
          return  posts ;
        }

    //인기글 관련 : 조회수 순
    async getPopularPosts() {
          const sortPosts = await this.SearcherRepository.getPopularPosts();
          console.log('서비스2',sortPosts)

          return  sortPosts ;
        }

    // 클럽 인기글 2개
    async getPopularClubs() {
        const sortPosts = await this.SearcherRepository.getPopularClubs()
        return sortPosts;
        }

    // 이벤트 인기글 2개
    async getPopularEvents() {
        const sortPosts = await this.SearcherRepository.getPopularEvents()
        return sortPosts;
    }




    //작성일 가입일 조정 date-fns
    async getTimeFormat123123(Settings) {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log(timeZone); // 서버 시간대 출력

        const currentDate=new Date();
        const ko = koLocale
        const DDD = Settings.map(data => ({
            ...data, createdAt: utcToZonedTime(data.createdAt, timeZone)}))
        const dateSet = {isSameDay, format, currentDate, ko, DDD}
        
        return dateSet
    }

    async getTimeFormat() {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log(timeZone); // 서버 시간대 출력

        const currentDate=new Date();
        const ko = koLocale

        const dateSet = {isSameDay, format, currentDate, ko}
        
        return dateSet
    }



}

