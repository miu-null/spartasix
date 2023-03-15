import { MailerService } from "@nestjs-modules/mailer"
import { Injectable } from "@nestjs/common"

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async findPassword(email: string) {
    const randomPassword = await this.randomString();
    await this.mailerService.sendMail({
      to: `${email}`,
      from: "cvy5333@gmail.com",
      subject: "[스파르타 커뮤클럽] 비밀번호 인증",
      text: `인증 번호는 [ ${randomPassword} ] 입니다.`,
    })
    return randomPassword
  }


  async randomString() {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}