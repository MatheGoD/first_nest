import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// controller in charge of mapping the url and receiving the request

//In NestJs if you want import something, you should ask for it.

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  //if you want something, you have to ask for it
  @Get('/:id')
  getByMovieId(@Param('id') movieId: number): Movie {
    return this.moviesService.getByMovieId(movieId);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDto) {
    this.moviesService.create(movieData);
    return 'Movie was Successfully Created';
  }

  @Delete('/:id')
  deleteMovie(@Param('id') moiveId: number) {
    return this.moviesService.deleteOne(moiveId);
  }

  @Patch('/:id')
  patchMovie(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
