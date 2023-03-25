// import { IsOptional, IsString } from "class-validator";
// o

// export class PaginationDto {
//   @ApiModelProperty({
//     description: "The cursor to start from. Omit to start from the beginning.",
//     required: false,
//   })
//   @IsOptional()
//   @IsString()
//   cursor?: string;

//   @ApiModelProperty({
//     description: "The maximum number of items to return. Defaults to 10.",
//     required: false,
//   })
//   @IsOptional()
//   @IsInt()
//   @Type(() => Number)
//   @Min(1)
//   @Max(50)
//   limit?: number = 10;
// }
