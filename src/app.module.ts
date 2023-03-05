import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigService } from './config/typeorm.config.service';
import { SearcherModule } from './searcher/searcher.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: typeOrmConfigService,
    }),
    SearcherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
