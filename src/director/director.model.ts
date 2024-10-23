import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { DirectorUser } from 'src/director_user/director_user';
import { Movie } from 'src/movie/movie.model';
import { MovieDirector } from 'src/movie_director/movie_director.model';
import { User } from 'src/user/user.model';

interface DirectorCreationAttrs {
  name: string;
  surname: string;
  birthday: string;
  dateOfDeath?: string;
  imgUrl?: string;
  placeOfBirth: string;
  genre: string;
}

@Table({ tableName: 'directors' })
export class Director extends Model<Director, DirectorCreationAttrs> {
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

  @Column({ type: DataType.DATEONLY, allowNull: false })
  birthday: string;

  @Column({ type: DataType.DATEONLY, allowNull: true })
  dateOfDeath: string;

  @Column({ type: DataType.STRING, allowNull: true })
  imgUrl: string;

  @Column({ type: DataType.STRING, allowNull: false })
  placeOfBirth: string;

  @BelongsToMany(() => User, () => DirectorUser)
  users: User[];

  @BelongsToMany(() => Movie, () => MovieDirector)
  movies: Director[];
}
