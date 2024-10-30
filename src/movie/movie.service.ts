import { Injectable } from '@nestjs/common';
import { Movie } from './movie.model';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Director } from 'src/director/director.model';
import { Actor } from 'src/actor/actor.model';
import { Op } from 'sequelize';
import { FilesService } from 'src/files/files.service';

interface GetAllMoviesOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  search?: string;
}

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie) private movieRepository: typeof Movie,
    private fileService: FilesService,
  ) {}

  async createMovie(dto: CreateMovieDto, image?: any) {
    let fileName: string | null = null;

    if (image) {
      fileName = await this.fileService.createImage(image);
    }

    const movie = await this.movieRepository.create({
      ...dto,
      image: fileName,
    });

    return movie;
  }

  async getAllMovies(options: GetAllMoviesOptions) {
    const {
      page = 1,
      limit = 3,
      sortBy = 'title',
      sortOrder = 'ASC',
      search,
    } = options;

    const offset = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { genre: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const movies = await this.movieRepository.findAndCountAll({
      where,
      include: [Director, Actor],
      distinct: true,
      limit,
      offset,
      order: [[sortBy, sortOrder]],
    });

    return {
      data: movies.rows,
      pagination: {
        total: movies.count,
        current_page: Number(page),
        limit: Number(limit),
        total_pages: Math.ceil(movies.count / limit),
      },
    };
  }

  async getMovieById(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      include: [Director, Actor],
    });

    return movie;
  }
}
