import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

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
    });
    return randomPassword;
  }

  async randomString() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  async remindEmail(
    email: string,
    startDate: Date,
    endDate: Date,
    title: string,
  ) {
    await this.mailerService.sendMail({
      to: `${email}`,
      from: "harucometrue7@gmail.com",
      subject: "[스파르타 커뮤클럽] 이벤트 리마인더",
      text: "",
      html: `
            <div>
              <p>귀하께서 신청하신 ${title} 이벤트</p>
              <p>이벤트 기간은 ${startDate}일부터 ${endDate}일까지 입니다. </p>
            </div>
          `,
    });
  }

  async arrivalApplication(
    email: string,
    title: string,
    userId: number,
  ) {
    await this.mailerService.sendMail({
      to: `${email}`,
      from: "belucent0@gmail.com",
      subject: "[스파르타 커뮤클럽] 모임 신청서가 도착했습니다.",
      text: "",
      html: `
            <div>
              <p>귀하께서 모집중인 게시글 <${title}> 에 접수된 신청서가 도착했습니다.</p>
              <p>로그인 한 뒤 유저페이지의 편지봉투 모양의 신청서함을 열어봐주세요. </p>
              <p>수락과 거절을 선택할 수 있습니다.</p>
              <p>https://spartasix.herokuapp.com/userpage/${userId}</p>
            </div>
          `,
    });
  }

}
