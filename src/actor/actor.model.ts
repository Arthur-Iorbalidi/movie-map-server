import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ActorUser } from 'src/actor_user/actor_user';
import { Movie } from 'src/movie/movie.model';
import { MovieActor } from 'src/movie_actor/movie_actor.model';
import { User } from 'src/user/user.model';

interface ActorCreationAttrs {
  name: string;
  surname: string;
  height?: number;
  birthday: string;
  dateOfDeath?: string;
  imgUrl?: string;
  placeOfBirth: string;
}

@Table({ tableName: 'actors' })
export class Actor extends Model<Actor, ActorCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.DECIMAL, allowNull: true })
  height: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  birthday: string;

  @Column({ type: DataType.DATEONLY, allowNull: true })
  dateOfDeath: string;

  @Column({ type: DataType.STRING, allowNull: true })
  imgUrl: string;

  @Column({ type: DataType.STRING, allowNull: false })
  placeOfBirth: string;

  @BelongsToMany(() => Movie, () => MovieActor)
  movies: Movie[];

  @BelongsToMany(() => User, () => ActorUser)
  users: User[];
}
