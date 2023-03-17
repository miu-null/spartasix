import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClubService } from 'src/club/club.service';
import { SearcherRepository } from 'src/searcher/searcher.repositoy';
import { PaginationService } from './pagination.service';


@Module({

  providers: [PaginationService, 
    // SearcherRepository, ClubService
  ]
})
export class PaginationModule {}
