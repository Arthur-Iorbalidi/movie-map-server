import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.model';
import { MovieModule } from './movie/movie.module';
import { ActorModule } from './actor/actor.module';
import { DirectorModule } from './director/director.module';
import { Movie } from './movie/movie.model';
import { Actor } from './actor/actor.model';
import { Director } from './director/director.model';
import { MovieActor } from './movie_actor/movie_actor.model';
import { DirectorUser } from './director_user/director_user';
import { ActorUser } from './actor_user/actor_user';
import { MovieUser } from './movie_user/movie_user.model';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Movie,
        Actor,
        Director,
        MovieActor,
        DirectorUser,
        ActorUser,
        MovieUser,
      ],
      autoLoadModels: true,
    }),
    UserModule,
    MovieModule,
    ActorModule,
    DirectorModule,
    AuthModule,
  ],
})
export class AppModule {}
