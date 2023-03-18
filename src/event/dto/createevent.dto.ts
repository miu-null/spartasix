import { IsString } from "class-validator";

export class CreateEventDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly date: Date;
}
