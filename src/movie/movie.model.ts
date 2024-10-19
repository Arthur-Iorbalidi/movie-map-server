import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Actor } from 'src/actor/actor.model';
import { Director } from 'src/director/director.model';
import { MovieActor } from 'src/movie_actor/movie_actor.model';
import { MovieUser } from 'src/movie_user/movie_user';
import { User } from 'src/user/user.model';

interface MovieCreationAttrs {
  tittle: string;
  description?: string;
  creationDate: string;
  genre: string;
  logoUrl?: string;
  budget: string;
}

@Table({ tableName: 'movies' })
export class Movie extends Model<Movie, MovieCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  tittle: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  creationDate: string;

  @Column({ type: DataType.STRING, allowNull: false })
  genre: string;

  @Column({ type: DataType.STRING, allowNull: true })
  logoUrl: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  budget: string;

  @BelongsToMany(() => Actor, () => MovieActor)
  actors: Actor[];

  @BelongsToMany(() => User, () => MovieUser)
  users: User[];

  @ForeignKey(() => Director)
  @Column({ type: DataType.INTEGER })
  directorId: number;

  @BelongsTo(() => Director)
  director: Director;
}