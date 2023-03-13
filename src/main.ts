import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  //express-ejs-layouts 설정
  app.set("layout", "../main.ejs");

  //ejs 셋팅
  app.useStaticAssets(join(__dirname, "../", "views", "static")); //static폴더를 현재폴더(dirname)에서 한칸 상위('..')에 있는 views/public 폴더로 지정
  app.setBaseViewsDir(join(__dirname, "../", "views", "templates")); //view폴더 지정 :현재폴더(dirname)에서 한칸 상위('..')에 있는 views폴더로 지정
  app.setViewEngine("ejs"); //view엔진을 ejs로 셋팅

  const PORT = process.env.PORT;

  await app.listen(PORT, function () {
    console.log(`서버가 ${PORT} 포트로 열렸습니다. http://localhost:${PORT}`);
  });
}
bootstrap();
