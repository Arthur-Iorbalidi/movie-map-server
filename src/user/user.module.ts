import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Movie } from 'src/movie/movie.model';
import { Actor } from 'src/actor/actor.model';
import { Director } from 'src/director/director.model';
import { DirectorUser } from 'src/director_user/director_user';
import { ActorUser } from 'src/actor_user/actor_user';
import { MovieUser } from 'src/movie_user/movie_user';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Movie,
      Actor,
      Director,
      DirectorUser,
      ActorUser,
      MovieUser,
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
