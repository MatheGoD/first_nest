import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
// amazing can validate the input
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
//PartialType Create내부에 있는 프로퍼티 값들이 필수사항이 아니어도 된다는 허용 모듈
