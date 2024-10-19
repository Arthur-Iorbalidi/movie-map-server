import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Actor } from 'src/actor/actor.model';
import { Movie } from 'src/movie/movie.model';

@Table({ tableName: 'movie_actors', createdAt: false, updatedAt: false })
export class MovieActor extends Model<MovieActor> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Movie)
  @Column({ type: DataType.INTEGER })
  movieId: number;

  @ForeignKey(() => Actor)
  @Column({ type: DataType.INTEGER })
  actorId: number;
}
