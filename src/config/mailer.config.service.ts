import { MailerOptions, MailerOptionsFactory } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class MailerConfigService implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: this.configService.get<string>("MAILER_HOST"),
        port: this.configService.get<number>("MAILER_PORT"),
        secure: this.configService.get<boolean>("MAILER_SECURE"),
        auth: {
          user: this.configService.get<string>("MAILER_USER"),
          pass: this.configService.get<string>("MAILER_PASS"),
        },
      },
    };
  }
}
