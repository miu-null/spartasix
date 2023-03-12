import { IsNumber, IsString } from 'class-validator';

export class UpdateEventDto {

   
    @IsNumber()
    readonly userId: number;
  
    @IsString()
    readonly title: string;
  
    @IsString()
    readonly content: string;
  
    @IsString()
    readonly date: Date;
  

}