import { IsDate, IsNumber, IsString,IsOptional} from 'class-validator';

export class UpdateEventDto {
    @IsString()
    readonly title: string;
  
    @IsString()
    readonly content: string;
  
    @IsString()
    readonly date: Date;

    @IsDate()
    readonly startDate: Date;

    @IsDate()
    readonly endDate: Date;
  
    @IsOptional()
    @IsString()
    readonly postIMG?: string;
}