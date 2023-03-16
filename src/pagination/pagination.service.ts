import { Injectable } from '@nestjs/common';
import { ClubService } from 'src/club/club.service';
import { SearcherRepository } from 'src/searcher/searcher.repositoy';

@Injectable()
export class PaginationService {
    constructor(
        // private clubService : ClubService,
        // private SearcherRepository: SearcherRepository,
        ) {}  

      //페이지네이션 적용 전, 게시판 및 유저 데이터 선택
    async selectData(pageType : string, term : string=null) {
        let getdata
        if (pageType === 'users') {
            // getdata = await this.SearcherRepository.findUsers(term);
        } else if (pageType === 'events') {
            // getdata = await this.SearcherRepository.findEventPosts(term);
        } else if (pageType === 'events') {

        } else if (pageType === 'events') {

        } else if (pageType === 'clubs') {
            // getdata = await this.clubService.getClubs(); //테스트용 
        } else (pageType === '') 

    
    return getdata;
    }

    //페이지네이션용 함수
    async paginatedResults(pageType :any, page:number, term : string=null) {
        const take:number = 4
        const seletedData = await this.selectData(pageType, term)

        const totalDataCount = seletedData.length;  //불러온 데이터 목록 수
        const startIndex = (page - 1) * take
        const endIndex = page * take

        const slicedData = seletedData.slice(startIndex, endIndex)  // 페이지당 조회할 데이터 묶음
        const lastPage = Math.ceil(totalDataCount / take)   //생성될 페이지 수

        const unitSize = 3 // 페이지 묶음 단위 : 3개씩 < 1 2 3>  <4 5 6> 
        const numOfUnits = Math.floor((page  - 1) / unitSize)  //<1 2 3> 페이지는 0 번째 index
        const unitStart = numOfUnits * unitSize + 1  //0번째 묶음의 시작은 1페이지, 1번째 묶음 시작은 4페이지...
        const unitEnd = unitStart + (unitSize - 1) //0번째 묶음의 끝은 3페이지, 1번째 묶음 끝은 6페이지
        const paginatedDemand = {term, page, slicedData, lastPage, unitStart, unitEnd,};

        return {
        ...paginatedDemand
        };
}


}