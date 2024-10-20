import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Director } from './director.model';
import { DirectorUser } from 'src/director_user/director_user';
import { User } from 'src/user/user.model';
import { Movie } from 'src/movie/movie.model';

@Module({
  controllers: [DirectorController],
  providers: [DirectorService],
  imports: [SequelizeModule.forFeature([Director, Movie, User, DirectorUser])],
  exports: [DirectorService],
})
export class DirectorModule {}
