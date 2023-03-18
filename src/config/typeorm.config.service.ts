import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { AbusingClubCounts } from "src/entities/abusingclubcounts.entity";
import { AbusingEventCounts } from "src/entities/abusingeventcounts.entity";
import { ClubCommentLikes } from "src/entities/clubcommentlikes.entity";
import { ClubComments } from "src/entities/clubcomments.entity";
import { ClubLikes } from "src/entities/clublikes.entity";
import { ClubMembers } from "src/entities/clubmembers.entity";
import { Clubs } from "src/entities/clubs.entity";
import { ClubSecondComments } from "src/entities/clubsecondcomments.entity";
import { EventComments } from "src/entities/eventcomments.entity";
import { EventCommentLikes } from "src/entities/eventcommentlikes.entity";
import { EventLikes } from "src/entities/eventlikes.entity";
import { EventMembers } from "src/entities/eventmembers.entity";
import { EventPosts } from "src/entities/eventposts.entity";
import { EventSecondComments } from "src/entities/eventsecondcomments.entity";
import { Users } from "src/entities/users.entity";

@Injectable()
export class typeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.configService.get<string>("DATABASE_HOST"),
      port: this.configService.get<number>("DATABASE_PORT"),
      username: this.configService.get<string>("DATABASE_USERNAME"),
      password: this.configService.get<string>("DATABASE_PASSWORD"),
      database: this.configService.get<string>("DATABASE_NAME"),
      entities: [
        Users,
        Clubs,
        AbusingClubCounts,
        EventSecondComments,
        EventPosts,
        EventMembers,
        EventLikes,
        EventCommentLikes,
        EventComments,
        ClubSecondComments,
        ClubMembers,
        ClubLikes,
        ClubComments,
        ClubCommentLikes,
        AbusingEventCounts,
      ],
      // entities: [join(__dirname, "/../entities/*.entity{.ts,.js}")], // 최종적으로 모든 entity 파일이 전부 import 되었을 때 사용 가능.
      synchronize: this.configService.get<boolean>("DATABASE_SYNCHRONIZE"),
      autoLoadEntities: true,
      logging: "all",
      timezone: "Asia/Seoul",
      charset: "utf8mb4"
    };
  }
}
