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
import { SearcherService } from "./searcher.service";
import { reformPostDate } from "../../views/static/js/filter";
import { OptionalAuthGuard } from '../auth/optional-auth.guard';

interface SearchResults {
  data: any[];
  count: number;
  totalPages: number;
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
export class SearcherController {
  constructor(private searchService: SearcherService) {}

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
      const terms = await this.searchService.findAllPosts(term);
      const events = terms.events;
      const clubs = terms.clubs;
      const users = terms.users;
      const results = { term, events, clubs, users, reformPostDate };
      const popularPosts = await this.searchService.getPopularPosts()
      
      return res.render("searchAll.ejs", {
        ...results,
        ...popularPosts,
        popularPosts,
        buttonUserId
      });
  }

  // 유저 검색
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
      const userData: PaginatedResult = await this.searchService.paginatedResults(
        "users",
        page,
        term,
      );
      return {
        data: userData.slicedData,
        count: userData.searchCount,
        totalPages: userData.lastPage,
      };
    } catch (err) {
      console.error(err.message);
    }
  }
}