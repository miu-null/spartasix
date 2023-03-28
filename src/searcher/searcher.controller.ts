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
} from "@nestjs/common";
import { Response } from "express";
import { SearcherService } from "./searcher.service";
import { reformPostDate } from "../../views/static/js/filter";

@Controller("search")
export class SearcherController {
  constructor(private searchService: SearcherService) {}

  @Get("all")
  async searchAllPosts(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query() term,
    @Res() res: Response,
    @Req() req
  ): Promise<void> {
    try {
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
      });

    } catch (err) {
      console.error(err.message);
    }
  }

  @Get("users")
  @Render("userSearch.ejs")
  async searchUsers(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query() term,
  ) {
    try {
      const userData = await this.searchService.paginatedResults(
        "users",
        page,
        term,
      );
      return {
        term,
        page,
        ...userData,
        reformPostDate
      };
    } catch (err) {
      console.error(err.message);
    }
  }
}
