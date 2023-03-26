import { IsNumber } from "class-validator";

export class DeleteEventDto {
  @IsNumber()
  readonly id: Number;
}
