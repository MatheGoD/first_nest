import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getByMovieId(id: number): Movie {
    const movieDetails = this.movies.find((movie) => movie.id === id);
    if (!movieDetails) {
      throw new NotFoundException('Movie with this ID NOT FOUND');
    }
    return movieDetails;
  }

  deleteOne(id: number): string {
    this.getByMovieId(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return 'Successfully Deleted';
  }
  //dto 를 쓰는 이유 프로그래머로서 코드르 더 간결하게 만들어주고 네스트 js가 들어오는 쿼리에 대한 유효성 검사
  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getByMovieId(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
