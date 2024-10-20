import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from 'src/movie/movie.model';
import { Actor } from './actor.model';
import { MovieActor } from 'src/movie_actor/movie_actor.model';
import { ActorUser } from 'src/actor_user/actor_user';

@Module({
  controllers: [ActorController],
  providers: [ActorService],
  imports: [SequelizeModule.forFeature([Actor, Movie, MovieActor, ActorUser])],
  exports: [ActorService],
})
export class ActorModule {}
