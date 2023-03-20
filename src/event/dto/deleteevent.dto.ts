import { IsNumber } from 'class-validator';

export class DeleteEventDto {
    @IsNumber()
    readonly eventPostId: Number;
  
}