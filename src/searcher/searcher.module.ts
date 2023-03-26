import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtConfigService } from "src/config/jwt.config.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config";
import { SearcherController } from "./searcher.controller";
import { SearcherService } from "./searcher.service";
import { SearcherRepository } from "./searcher.repositoy";
import { Clubs } from "src/entities/clubs.entity";
import { ClubMembers } from "src/entities/clubmembers.entity";
import { ClubRepository } from "src/club/club.repository";
import { EventRepository } from "src/event/event.repository";
import { Users } from "src/entities/users.entity";
import { EventPosts } from "src/entities/events.entity";
import { AbusingClubCounts } from "src/entities/abusingclubcounts.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      EventPosts,
      Clubs,
      ClubMembers,
      AbusingClubCounts,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule, SearcherService, SearcherRepository],
  controllers: [SearcherController],
  providers: [
    SearcherService,
    SearcherRepository,
    ClubRepository,
    EventRepository,
  ],
})
export class SearcherModule {}
