import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { join } from "path";

@Injectable()
export class typeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) { }
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.configService.get<string>("DATABASE_HOST"),
      port: this.configService.get<number>("DATABASE_PORT"),
      username: this.configService.get<string>("DATABASE_USERNAME"),
      password: this.configService.get<string>("DATABASE_PASSWORD"),
      database: this.configService.get<string>("DATABASE_NAME"),
      entities: [join(__dirname, "/../**/**.entity{.ts,.js}")],
      synchronize: this.configService.get<boolean>("DATABASE_SYNCHRONIZE"),
    };
  }
}
