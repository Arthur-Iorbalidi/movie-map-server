import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Actor } from 'src/actor/actor.model';
import { User } from 'src/user/user.model';

@Table({ tableName: 'actor_users', createdAt: false, updatedAt: false })
export class ActorUser extends Model<ActorUser> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Actor)
  @Column({ type: DataType.INTEGER })
  actorId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
