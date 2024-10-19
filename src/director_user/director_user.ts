import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Director } from 'src/director/director.model';
import { User } from 'src/user/user.model';

@Table({ tableName: 'director_users', createdAt: false, updatedAt: false })
export class DirectorUser extends Model<DirectorUser> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Director)
  @Column({ type: DataType.INTEGER })
  directorId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
