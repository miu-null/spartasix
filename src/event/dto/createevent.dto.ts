import { IsString, IsOptional, IsEmail } from "class-validator";

export class CreateEventDto {
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
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly postIMG?: string;
}
