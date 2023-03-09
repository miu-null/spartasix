import { IsNumber, IsString } from "class-validator";

export class CreateEventDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly date: Date;

  @IsNumber()
  readonly viewCount: number;
}
