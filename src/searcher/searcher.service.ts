import { Injectable } from "@nestjs/common";
import { SearcherRepository } from "./searcher.repository";

interface PaginatedResult {
  data: any[];
  count: number;
  totalPages: number;
  slicedData: any[]; 
  searchCount: any; 
  lastPage: number;
  unitStart: number;
  unitEnd: number;
}

@Injectable()
export class SearcherService {
  constructor(private SearcherRepository: SearcherRepository) {}

  async findAllPosts(term: any) {
    const results = await this.SearcherRepository.findAllPosts(term);

    return results;
  }

  async findEventPosts(term: any) {
    const results = await this.SearcherRepository.findEventPosts(term);

    return results;
  }

  async findClubPosts(term: any) {
    const results = await this.SearcherRepository.findClubPosts(term);

    return results;
  }

  async findUsers(term: any) {
    const results = await this.SearcherRepository.findUsers(term);

    return results;
  }

  //검색목록 페이지네이션 준비 : 타입에 따른 리포지토리 선택
  async selectData(pageType: string, page: number, term: any) {
    let getdata;
    if (pageType === "users") {
      getdata = await this.SearcherRepository.findUsers(term);
    } else if (pageType === "events") {
      getdata = await this.SearcherRepository.findEventPosts(term);
    } else if (pageType === "clubs") {
      getdata = await this.SearcherRepository.findClubPosts(term);
    } else {
    }
    return getdata;
  }

  //검색목록 페이지네이션
  async paginatedResults(pageType: string, page, term: string): Promise<PaginatedResult> {
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
    const posts = await this.SearcherRepository.getAllPosts();
    return posts;
  }

  async getPopularPosts() {
    const sortPosts = await this.SearcherRepository.getPopularPosts();

    return sortPosts;
  }

  async getPopularClubs() {
    const sortPosts = await this.SearcherRepository.getPopularClubs();
    return sortPosts;
  }

  async getPopularEvents() {
    const sortPosts = await this.SearcherRepository.getPopularEvents();
    return sortPosts;
  }

  async getUserRank() {
    const sortPosts = await this.SearcherRepository.getUserRank();
    return sortPosts;
  }
}
