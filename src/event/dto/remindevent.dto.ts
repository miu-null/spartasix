import { PickType } from "@nestjs/mapped-types";
import{ CreateEventDto } from "./createevent.dto";

export class remindEmailDto extends PickType(CreateEventDto,[
    "email",
]as const) {}