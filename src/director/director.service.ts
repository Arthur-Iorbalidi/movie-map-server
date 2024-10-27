import { Injectable } from '@nestjs/common';
import { Director } from './director.model';
import { CreateDirectorDto } from './dto/create-director.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from 'src/movie/movie.model';
import { Op } from 'sequelize';

interface GetAllDirectorsOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  search?: string;
}

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel(Director) private directorRepository: typeof Director,
  ) {}

  async createDirector(dto: CreateDirectorDto) {
    const director = await this.directorRepository.create(dto);

    return director;
  }

  async getAll(options: GetAllDirectorsOptions) {
    const {
      page = 1,
      limit = 3,
      sortBy = 'name',
      sortOrder = 'ASC',
      search,
    } = options;

    const offset = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { surname: { [Op.iLike]: `%${search}%` } },
        { placeOfBirth: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const directors = await this.directorRepository.findAndCountAll({
      where,
      include: [Movie],
      distinct: true,
      limit,
      offset,
      order: [[sortBy, sortOrder]],
    });

    return {
      data: directors.rows,
      pagination: {
        total: directors.count,
        current_page: Number(page),
        limit: Number(limit),
        total_pages: Math.ceil(directors.count / limit),
      },
    };
  }

  async getById(id: number) {
    const director = await this.directorRepository.findOne({
      where: { id },
      include: [Movie],
    });

    return director;
  }
}
