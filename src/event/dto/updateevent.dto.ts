import { IsDate, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateEventDto {
    @IsString()
    readonly title: string;
  
    @IsOptional()
    @IsString()
    readonly content: string;

    @IsString()
    readonly startDate: Date;

    
    @IsString()
    readonly endDate: Date;

    @IsOptional()
    @IsString()
    readonly postIMG?: string;
}