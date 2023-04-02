import { Injectable } from "@nestjs/common";
import { FilterRepository } from "./filter.repository";
import { searchType, PaginatedResult } from "./searchFilter";

@Injectable()
export class FilterService {
  constructor(private filterRepository: FilterRepository) {}

  async findAllPosts(term: any) {
    const results = await this.filterRepository.findAllPosts(term);

    return results;
  }

  async findEventPosts(term: any) {
    const results = await this.filterRepository.findEventPosts(term);

    return results;
  }

  async findClubPosts(term: any) {
    const results = await this.filterRepository.findClubPosts(term);

    return results;
  }

  async findUsers(term: any) {
    const results = await this.filterRepository.findUsers(term);

    return results;
  }

  //검색목록 페이지네이션 준비 : 타입에 따른 리포지토리 선택
  async selectData(pageType: searchType, page: number, term: any) {
    let getdata;
    if (pageType === searchType.users ) { 
      getdata = await this.filterRepository.findUsers(term);
    } else if (pageType === searchType.eventsTitleContent ) {
      getdata = await this.filterRepository.findEventPosts(term);
    } else if (pageType === searchType.eventsTitle) {
      getdata = await this.filterRepository.findEventPostsTitle(term);
    } else if (pageType === searchType.clubsTitleContent ) {
      getdata = await this.filterRepository.findClubPosts(term);
    } else if (pageType === searchType.clubsTitle) {
      getdata = await this.filterRepository.findClubPostsTitle(term);
    }
    return getdata;
  }

  //검색목록 페이지네이션
  async paginatedResults(pageType: searchType, page, term: string): Promise<PaginatedResult> {
    const take: number = 5;
    const seletedData = await this.selectData(pageType, page, term);
    const searchCount = seletedData.length;
  
    const totalDataCount = seletedData.length;
    const startIndex = (page - 1) * take;
    const endIndex = page * take;
  
    const slicedData = seletedData.slice(startIndex, endIndex);
    const lastPage = Math.ceil(totalDataCount / take);
  
    const unitSize = 3;
    const numOfUnits = Math.floor((page - 1) / unitSize);
    const unitStart = numOfUnits * unitSize + 1;
    const unitEnd = unitStart + (unitSize - 1);
    const paginatedDemand: PaginatedResult = {
      data: slicedData,
      count: searchCount,
      totalPages: lastPage,
      slicedData,
      lastPage,
      unitStart,
      unitEnd,
      searchCount,
    };
  
    return paginatedDemand;
  }
  

  async getAllPosts() {
    const posts = await this.filterRepository.getAllPosts();
    return posts;
  }

  async getPopularPosts() {
    const sortPosts = await this.filterRepository.getPopularPosts();

    return sortPosts;
  }

  async getPopularClubs() {
    const sortPosts = await this.filterRepository.getPopularClubs();
    return sortPosts;
  }

  async getPopularEvents() {
    const sortPosts = await this.filterRepository.getPopularEvents();
    return sortPosts;
  }

  async getUserRank() {
    const sortPosts = await this.filterRepository.getUserRank();
    return sortPosts;
  }
}
