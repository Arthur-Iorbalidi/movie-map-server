import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
    @Query('search') search?: string,
  ) {
    return this.movieService.getAllMovies({
      page,
      limit,
      sortBy,
      sortOrder,
      search,
    });
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
