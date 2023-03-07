
import { Body, Controller, Post, Param ,Get, Put,Delete} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/createevent.dto";
import { UpdateEventDto } from "./dto/updateevent.dto";
import { DeleteEventDto } from "./dto/deleteevent.dto";

@Controller('event')
export class EventController {
        constructor(private eventService: EventService) {}
    

        @Post("/events")
        async createUser(@Body() data: CreateEventDto) {
          return this.eventService.createEvent(
            data.userId,
            data.title,
            data.content,
            data.date,
            data.viewCount,
          );
        }
        
        @Get('/articles/:id')
        getArticleById(@Param('id') articleId: number) {
          return this.eventService.getEventById(articleId);
        }
      
      
        @Put('/articles/:id')
        updateArticle(
          @Param('id') articleId: number,
          @Body() data: UpdateEventDto,
        ) {
          return this.eventService.updateEvent(
            articleId,
            data.title,
            data.content
          );
        }
      
        @Delete('/articles/:id')
        deleteArticle(
          @Param('id') articleId: number,
          @Body() data: DeleteEventDto,
        ) {
          return this.eventService.deleteEvente(articleId, data.password);
        }


    
}
