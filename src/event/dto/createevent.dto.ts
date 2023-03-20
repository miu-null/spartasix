import { IsString, IsOptional,IsDate, IsEmail } from "class-validator";

export class CreateEventDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly startDate: Date;

  @IsString()
  readonly endDate: Date;

  @IsOptional()
  @IsString()
  readonly postIMG?: string;
  
  @IsOptional()
  @IsEmail()
  readonly email: string;
}
