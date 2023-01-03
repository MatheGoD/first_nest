import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getByMovieId(id: string): Movie {
    const movieDetails = this.movies.find((movie) => movie.id === parseInt(id));
    if (!movieDetails) {
      throw new NotFoundException('Moview with this ID NOT FOUND');
    }
    return movieDetails;
  }

  deleteOne(id: string): string {
    this.getByMovieId(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
    console.log(this.movies);
    return 'Successfully Deleted';
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
  update(id: string, updateData) {
    const movie = this.getByMovieId(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
