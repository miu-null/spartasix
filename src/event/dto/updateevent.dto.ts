import { IsNumber, IsString } from 'class-validator';

export class UpdateEventDto {
    @IsString()
    readonly userId: string;
  
    @IsString()
    readonly title: string;
  
    @IsString()
    readonly content: string;
  
    @IsString()
    readonly date: Date;
  
    @IsNumber()
    readonly viewCount: number;
}