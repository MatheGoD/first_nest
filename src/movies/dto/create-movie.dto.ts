import { IsNumber, IsOptional, IsString } from 'class-validator';
// amazing can validate the input
export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsString({ each: true })
  @IsOptional()
  readonly genres: string[];
}
