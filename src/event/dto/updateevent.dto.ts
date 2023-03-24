import { IsDate, IsNumber, IsString,IsOptional} from 'class-validator';

export class UpdateEventDto {
    @IsString()
    readonly title: string;
  
    @IsOptional()
    @IsString()
    readonly content: string;

    @IsDate()
    readonly startDate: Date;

    @IsDate()
    readonly endDate: Date;
  
}