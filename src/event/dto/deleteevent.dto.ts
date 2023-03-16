import { IsNumber, IsString } from 'class-validator';

export class DeleteEventDto {

  @IsNumber()
  readonly eventPostId: number;
}