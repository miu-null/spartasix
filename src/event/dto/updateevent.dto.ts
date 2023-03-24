import { IsDate, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateEventDto {
    @IsString()
    readonly title: string;

    @IsString()
    readonly startDate: Date;

    @IsString()
    readonly endDate: Date;

    @IsOptional()
    @IsString()
    readonly content: string;

    @IsOptional()
    @IsString()
    readonly postIMG?: string;
}