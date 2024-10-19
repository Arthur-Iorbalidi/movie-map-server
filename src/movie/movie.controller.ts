import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getAll() {
    return this.movieService.getAllMovies();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.movieService.getMovieById(id);
  }

  @Post()
  createMovie(@Body() movieDto: CreateMovieDto) {
    return this.movieService.createMovie(movieDto);
  }
}
