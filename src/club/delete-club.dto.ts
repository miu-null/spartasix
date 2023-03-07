// import { PickType } from '@nestjs/mapped-types';
// import { CreateClubDto } from './create-club.dto';

export class DeleteArticleDto extends PickType(CreateClubDto, [
  'password',
] as const) { }
