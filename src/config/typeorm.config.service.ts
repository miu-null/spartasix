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
import { EventComments } from "src/entities/eventcomments.entity";
import { EventCommentLikes } from "src/entities/eventcommentlikes.entity";
import { EventLikes } from "src/entities/eventlikes.entity";
import { EventMembers } from "src/entities/eventmembers.entity";
import { EventPosts } from "src/entities/events.entity";
import { Users } from "src/entities/users.entity";

@Injectable()
export class typeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.configService.get<string>("DATABASE_HOST"),
      port: parseInt(this.configService.get("DATABASE_PORT"), 10),
      username: this.configService.get<string>("DATABASE_USERNAME"),
      password: this.configService.get<string>("DATABASE_PASSWORD"),
      database: this.configService.get<string>("DATABASE_NAME"),
      entities: [
        Users,
        Clubs,
        AbusingClubCounts,
        EventPosts,
        EventMembers,
        EventLikes,
        EventCommentLikes,
        EventComments,
        ClubMembers,
        ClubLikes,
        ClubComments,
        ClubCommentLikes,
        AbusingEventCounts,
      ],
      synchronize: this.configService.get("DATABASE_SYNCHRONIZE") === "true",
      logging: this.configService.get("DATABASE_LOG") === "true",
      autoLoadEntities: true,
      // logging: "all",
      timezone: "Asia/Seoul",
      charset: "utf8mb4",
    };
  }
}
