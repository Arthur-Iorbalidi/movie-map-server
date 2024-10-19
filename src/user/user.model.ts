import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Actor } from 'src/actor/actor.model';
import { ActorUser } from 'src/actor_user/actor_user';
import { Director } from 'src/director/director.model';
import { DirectorUser } from 'src/director_user/director_user';
import { Movie } from 'src/movie/movie.model';
import { MovieUser } from 'src/movie_user/movie_user';

interface UserCreationAttrs {
  name: string;
  surname: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Arthur', description: 'User name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Iorbalidi', description: 'User surname' })
  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @ApiProperty({
    example: 'arthur.iorbalidi@gmail.com',
    description: 'User email',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '1111', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Movie, () => MovieUser)
  movies: Movie[];

  @BelongsToMany(() => Actor, () => ActorUser)
  actors: Actor[];

  @BelongsToMany(() => Director, () => DirectorUser)
  directors: Director[];
}
