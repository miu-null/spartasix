import {
  Controller,
  Get,
  Query,
  Res,
  Req,
  ParseIntPipe,
  DefaultValuePipe,
  Render,
  UseGuards,
  UnauthorizedException
} from "@nestjs/common";
import { Response } from "express";
import { FilterService } from "./filter.service";
import { reformPostDate } from "../../views/static/js/filter";
import { OptionalAuthGuard } from '../auth/optional-auth.guard';

interface SearchResults {
  slicedData: any[];
  searchCount: number;
  totalPages: number;
  term: string;
  page: number;
  unitStart,
  unitEnd,
  lastPage,
  reformPostDate,
  buttonUserId
}

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

@Controller("search")
export class FilterController {
  constructor(private filterService: FilterService) {}

  // 모든 게시물, 유저 검색
  @Get("all")
  @UseGuards(OptionalAuthGuard)
  async searchAllPosts(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query() term,
    @Res() res: Response,
    @Req() req
  ): Promise<void> {
    let buttonUserId = null;
    if (req.user) {
      buttonUserId = req.user
    } 
      const terms = await this.filterService.findAllPosts(term);
      const events = terms.events;
      const clubs = terms.clubs;
      const users = terms.users;
      const results = { term, events, clubs, users, reformPostDate };
      const popularPosts = await this.filterService.getPopularPosts()
      
      return res.render("searchAll.ejs", {
        ...results,
        ...popularPosts,
        popularPosts,
        buttonUserId
      });
  }

  // 유저 검색
  @Get("users")
  @UseGuards(OptionalAuthGuard)
  @Render("userSearch.ejs")
  async searchUsers(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query() term,
    @Req() req
  ): Promise<SearchResults | void> {
    let buttonUserId = null;
    if (req.user) {
      buttonUserId = req.user;
    }
    try {
      const userData: PaginatedResult = await this.filterService.paginatedResults(
        "users",
        page,
        term,
      );
      return {
        term,
        page,
        slicedData: userData.slicedData,
        searchCount: userData.searchCount,
        totalPages: userData.lastPage,
        unitStart : userData.unitStart,
        unitEnd : userData.unitEnd,
        lastPage : userData.lastPage,
        buttonUserId,
        reformPostDate,
        
      };
    } catch (err) {
      console.error(err.message);
    }
  }
}