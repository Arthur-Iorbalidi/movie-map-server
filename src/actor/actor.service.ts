import { Injectable } from '@nestjs/common';
import { Actor } from './actor.model';
import { CreateActorDto } from './dto/create-actor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from 'src/movie/movie.model';

@Injectable()
export class ActorService {
  constructor(@InjectModel(Actor) private directorRepository: typeof Actor) {}

  async createActor(dto: CreateActorDto) {
    const actor = await this.directorRepository.create(dto);

    return actor;
  }

  async getAll() {
    const actors = await this.directorRepository.findAll({
      include: [Movie],
    });

    return actors;
  }

  async getById(id: number) {
    const actor = await this.directorRepository.findOne({
      where: { id },
      include: [Movie],
    });

    return actor;
  }
}
