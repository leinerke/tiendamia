import { Model, Column, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript'

export class BaseEntity extends Model {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number
}
