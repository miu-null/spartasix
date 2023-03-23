import { IsString, IsOptional,IsDate, IsEmail } from "class-validator";

export class CreateEventDto {
  @IsOptional()
  // @IsString()
  readonly title: string;

  @IsOptional()
  // @IsString()
  readonly startDate: Date;

  @IsOptional()
  // @IsString()
  readonly endDate: Date;

  @IsOptional()
  // @IsString()
  readonly content: string;

  @IsOptional()
  // @IsString()
  readonly postIMG?: string;
  
  @IsOptional()
  // @IsEmail()
  readonly email: string;
}
