import { Injectable } from '@nestjs/common';
import { Actor } from './actor.model';
import { CreateActorDto } from './dto/create-actor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from 'src/movie/movie.model';
import { Op } from 'sequelize';

interface GetAllActorsOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  search?: string;
}

@Injectable()
export class ActorService {
  constructor(@InjectModel(Actor) private actorRepository: typeof Actor) {}

  async createActor(dto: CreateActorDto) {
    const actor = await this.actorRepository.create(dto);

    return actor;
  }

  async getAll(options: GetAllActorsOptions) {
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

    const actors = await this.actorRepository.findAndCountAll({
      where,
      include: [Movie],
      distinct: true,
      limit,
      offset,
      order: [[sortBy, sortOrder]],
    });

    return {
      data: actors.rows,
      pagination: {
        total: actors.count,
        current_page: Number(page),
        limit: Number(limit),
        total_pages: Math.ceil(actors.count / limit),
      },
    };
  }

  async getById(id: number) {
    const actor = await this.actorRepository.findOne({
      where: { id },
      include: [Movie],
    });

    return actor;
  }
}
