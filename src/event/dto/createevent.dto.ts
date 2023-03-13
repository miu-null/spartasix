import { IsNumber, IsString } from "class-validator";

export class CreateEventDto {


  @IsNumber()
  readonly eventPostId: number;

  @IsString()
  readonly userId: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly date: Date;

  @IsNumber()
  readonly viewCount: number;
}
