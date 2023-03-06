import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearcherController } from './searcher.controller';
import { SearcherService } from './searcher.service';
import { Searcher } from './entity/searcher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Searcher])],
  exports : [TypeOrmModule],
  controllers: [SearcherController],
  providers: [SearcherService]
})
export class SearcherModule {}
