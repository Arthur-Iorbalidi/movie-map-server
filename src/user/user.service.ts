import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { MovieUser } from 'src/movie_user/movie_user.model';
import { MovieService } from 'src/movie/movie.service';
import { ActorService } from 'src/actor/actor.service';
import { DirectorService } from 'src/director/director.service';
import { ActorUser } from 'src/actor_user/actor_user';
import { DirectorUser } from 'src/director_user/director_user';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(MovieUser) private movieUserRepository: typeof MovieUser,
    @InjectModel(ActorUser) private actorUserRepository: typeof ActorUser,
    @InjectModel(DirectorUser)
    private directorUserRepository: typeof DirectorUser,
    private movieService: MovieService,
    private actorService: ActorService,
    private directorService: DirectorService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      attributes: { exclude: ['password'] },
    });

    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
      attributes: { exclude: ['password'] },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.password) {
      const hashPassword = await bcrypt.hash(dto.password, 10);
      const updatedUser = {
        ...dto,
        password: hashPassword,
      };

      await user.update(updatedUser);
    } else {
      await user.update(dto);
    }

    return user;
  }

  async addMovieToFavorites(userId: number, movieId: number) {
    if (!userId || !movieId) {
      throw new BadRequestException('userId or movieId not provided');
    }

    const user = await this.getUserById(userId);
    const movie = await this.movieService.getMovieById(movieId);

    if (user && movie) {
      const movieUser = await this.movieUserRepository.create({
        userId,
        movieId,
      });
      return movieUser;
    } else {
      throw new NotFoundException('User or Movie not found');
    }
  }

  async removeMovieFromFavorites(userId: number, movieId: number) {
    if (!userId || !movieId) {
      throw new BadRequestException('userId or movieId not provided');
    }

    const movieUserRecord = await this.movieUserRepository.findOne({
      where: { userId, movieId },
    });

    if (movieUserRecord) {
      await movieUserRecord.destroy();
      return movieUserRecord;
    } else {
      throw new NotFoundException("Movie not found in user's favorites");
    }
  }

  async addActorToFavorites(userId: number, actorId: number) {
    if (!userId || !actorId) {
      throw new BadRequestException('userId or actorId not provided');
    }

    const user = await this.getUserById(userId);
    const actor = await this.actorService.getById(actorId);

    if (user && actor) {
      const actorUser = await this.actorUserRepository.create({
        userId,
        actorId,
      });
      return actorUser;
    } else {
      throw new NotFoundException('User or Actor not found');
    }
  }

  async removeActorFromFavorites(userId: number, actorId: number) {
    if (!userId || !actorId) {
      throw new BadRequestException('userId or actorId not provided');
    }

    const actorUserRecord = await this.actorUserRepository.findOne({
      where: { userId, actorId },
    });

    if (actorUserRecord) {
      await actorUserRecord.destroy();
      return actorUserRecord;
    } else {
      throw new NotFoundException("Actor not found in user's favorites");
    }
  }

  async addDirectorToFavorites(userId: number, directorId: number) {
    if (!userId || !directorId) {
      throw new BadRequestException('userId or directorId not provided');
    }

    const user = await this.getUserById(userId);
    const director = await this.directorService.getById(directorId);

    if (user && director) {
      const directorUser = await this.directorUserRepository.create({
        userId,
        directorId,
      });
      return directorUser;
    } else {
      throw new NotFoundException('User or Director not found');
    }
  }

  async removeDirectorFromFavorites(userId: number, directorId: number) {
    if (!userId || !directorId) {
      throw new BadRequestException('userId or directorId not provided');
    }

    const adirectorUserRecord = await this.directorUserRepository.findOne({
      where: { userId, directorId },
    });

    if (adirectorUserRecord) {
      await adirectorUserRecord.destroy();
      return adirectorUserRecord;
    } else {
      throw new NotFoundException("Director not found in user's favorites");
    }
  }
}
