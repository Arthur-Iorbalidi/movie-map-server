import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Movie } from 'src/movie/movie.model';
import { User } from 'src/user/user.model';

@Table({ tableName: 'movie_users', createdAt: false, updatedAt: false })
export class MovieUser extends Model<MovieUser> {
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

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
