import { IsNumber, IsString } from 'class-validator';

export class UpdateEventDto {
    @IsString()
    readonly title: string;
  
    @IsString()
    readonly content: string;
  
    @IsString()
    readonly date: Date;
  

}