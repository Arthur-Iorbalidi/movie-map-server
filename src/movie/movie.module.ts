import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './movie.model';
import { Actor } from 'src/actor/actor.model';
import { User } from 'src/user/user.model';
import { ActorUser } from 'src/actor_user/actor_user';
import { MovieActor } from 'src/movie_actor/movie_actor.model';
import { Director } from 'src/director/director.model';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [
    SequelizeModule.forFeature([
      Movie,
      Actor,
      User,
      Director,
      ActorUser,
      MovieActor,
    ]),
  ],
})
export class MovieModule {}
