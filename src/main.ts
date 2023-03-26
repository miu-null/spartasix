import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.set("layout", "../main.ejs");

  app.useStaticAssets(join(__dirname, "../", "views", "static"));
  app.setBaseViewsDir(join(__dirname, "../", "views", "templates"));
  app.setViewEngine("ejs");

  const PORT = process.env.PORT;

  await app.listen(PORT, function () {
    console.log(`서버가 ${PORT} 포트로 열렸습니다. http://localhost:${PORT}`);
  });
}
bootstrap();
