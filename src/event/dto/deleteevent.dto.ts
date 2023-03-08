import { IsNumber, IsString } from 'class-validator';

export class DeleteEventDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsNumber()
  readonly password: number;
}