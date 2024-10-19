import { Injectable } from '@nestjs/common';
import { Movie } from './movie.model';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Director } from 'src/director/director.model';
import { Actor } from 'src/actor/actor.model';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie) private movieRepository: typeof Movie) {}

  async createMovie(dto: CreateMovieDto) {
    const movie = await this.movieRepository.create(dto);

    return movie;
  }

  async getAllMovies() {
    const movies = await this.movieRepository.findAll({
      include: [Director, Actor],
    });

    return movies;
  }

  async getMovieById(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      include: [Director, Actor],
    });

    return movie;
  }
}
