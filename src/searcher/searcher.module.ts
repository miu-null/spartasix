import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfigService } from "src/config/jwt.config.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { SearcherController } from './searcher.controller';
import { SearcherService} from './searcher.service';
import { Searcher} from '../entities/searcher.entity';
import { Users } from '../entities/users.entity';
import { EventPosts } from '../entities/eventposts.entity'
import { SearcherRepository} from './searcher.repositoy';
import { Clubs } from "src/entities/clubs.entity";
import { ClubService } from 'src/club/club.service';
import { ClubMembersRepository } from 'src/userpage/clubmember.repository';
import { ClubMembers } from 'src/entities/clubmembers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Searcher, Users, EventPosts, Clubs, ClubMembers]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useClass: JwtConfigService,
    inject: [ConfigService],
  }),
],
  exports : [TypeOrmModule],
  controllers: [SearcherController],
  providers: [SearcherService, SearcherRepository, ClubService, ClubMembersRepository]
})
export class SearcherModule {} 