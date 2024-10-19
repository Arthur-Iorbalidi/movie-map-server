import { Injectable } from '@nestjs/common';
import { Director } from './director.model';
import { CreateDirectorDto } from './dto/create-director.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel(Director) private directorRepository: typeof Director,
  ) {}

  async createDirector(dto: CreateDirectorDto) {
    const director = await this.directorRepository.create(dto);

    return director;
  }

  async getAll() {
    const directors = await this.directorRepository.findAll();

    return directors;
  }

  async getById(id: number) {
    const director = await this.directorRepository.findOne({ where: { id } });

    return director;
  }
}
