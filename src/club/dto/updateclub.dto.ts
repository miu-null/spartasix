import { PartialType } from "@nestjs/mapped-types";
import { CreateClubDto } from "./createclub.dto";

export class UpdateClubDto extends PartialType(CreateClubDto) {}
