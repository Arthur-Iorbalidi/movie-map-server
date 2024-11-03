import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './movie.model';
import { Actor } from 'src/actor/actor.model';
import { User } from 'src/user/user.model';
import { ActorUser } from 'src/actor_user/actor_user.model';
import { MovieActor } from 'src/movie_actor/movie_actor.model';
import { Director } from 'src/director/director.model';
import { MovieDirector } from 'src/movie_director/movie_director.model';
import { FilesModule } from 'src/files/files.module';

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
      MovieDirector,
    ]),
    FilesModule,
  ],
  exports: [MovieService],
})
export class MovieModule {}
