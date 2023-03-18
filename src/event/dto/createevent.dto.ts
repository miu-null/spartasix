import { IsString, IsOptional } from "class-validator";

export class CreateEventDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly date: Date;

  @IsOptional()
  @IsString()
  readonly postIMG?: string;
}
