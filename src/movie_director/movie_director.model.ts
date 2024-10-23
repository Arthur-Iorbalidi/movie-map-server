import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Director } from 'src/director/director.model';
import { Movie } from 'src/movie/movie.model';

@Table({ tableName: 'movie_directors', createdAt: false, updatedAt: false })
export class MovieDirector extends Model<MovieDirector> {
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

  @ForeignKey(() => Director)
  @Column({ type: DataType.INTEGER })
  directorId: number;
}
