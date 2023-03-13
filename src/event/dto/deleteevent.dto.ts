import { IsNumber, IsString } from 'class-validator';

export class DeleteEventDto {

  @IsNumber()
  readonly userId: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsNumber()
  readonly password: number;
}