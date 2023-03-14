import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { MailerConfigService } from "src/config/mailer.config.service";
import { MailService } from "./mail.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MailerConfigService,
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [],
  controllers: [],
})
export class MailModule {}
