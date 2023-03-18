import { IsNumber, IsString } from "class-validator";

export class CreateEventDto {
  @IsNumber()
  readonly eventPostId: number;

  @IsNumber()
  readonly userId: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly date: Date;
}
