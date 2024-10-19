import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { Movie } from 'src/movie/movie.model';
import { MovieUser } from 'src/movie_user/movie_user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Movie) private movieRepository: typeof Movie,
    @InjectModel(MovieUser) private movieUserRepository: typeof MovieUser,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();

    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  async addMovieToFavorites(userId: number, movieId: number) {
    if (!userId || !movieId) {
      throw new BadRequestException('userId or movieId not provided');
    }

    const user = await this.userRepository.findByPk(userId);
    const movie = await this.movieRepository.findByPk(movieId);

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
}
