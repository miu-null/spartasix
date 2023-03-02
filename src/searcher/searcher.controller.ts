import { Controller, Get } from '@nestjs/common';

@Controller('search')
export class SearcherController {
    @Get()
    findAll() : string {
        return 'This action returns all results'
    }
}

