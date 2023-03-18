import { PickType } from "@nestjs/mapped-types";
import { CreateClubDto } from "./createclub.dto";

export class DeleteClubDto extends PickType(CreateClubDto, [] as const) {}
