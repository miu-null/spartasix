import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearcherController } from './searcher.controller';
import { SearcherService } from './searcher.service';
import { SearcherRepository } from './searcher.repositoy';

@Module({
  imports: [TypeOrmModule.forFeature([SearcherRepository])],
  exports : [TypeOrmModule],
  controllers: [SearcherController],
  providers: [SearcherService]
})
export class SearcherModule {}
