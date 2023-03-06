import { Body, Controller, Get, Post, Render} from '@nestjs/common';
import { CreateSearchDto } from './dto/CreateSearchDto';
import { SearcherService } from './searcher.service';
import { Searcher } from './entity/searcher.entity';

@Controller('search')
export class SearcherController {
    constructor(private searchService: SearcherService){};

    
    @Get()
    findAll() {
        return this.searchService.findAll();
    }


    @Post()
    create(@Body() searcher : Searcher){
        return this.searchService.create(searcher);
    }    

}


