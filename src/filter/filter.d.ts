export enum searchType {
    clubsTitleContent = "clubsTitleContent",
    clubsTitle = "clubsTitle",
    eventsTitleContent = "eventsTitleContent",
    eventsTitle = "eventsTitle",
    users = "users"
  }

export interface SearchResults {
    slicedData: any[];
    searchCount: number;
    totalPages: number;
    term: string;
    page: number;
    unitStart: number;
    unitEnd: number;
    lastPage: number;
    reformPostDate: any;
  }
  
export interface PaginatedResult {
    data: any[];
    count: number;
    totalPages: number;
    slicedData: any[]; 
    searchCount: any; 
    lastPage: number;
    unitStart: number;
    unitEnd: number;
  }