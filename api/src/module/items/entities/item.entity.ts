import { AllowNull, BelongsToMany, Column, DataType, Table } from 'sequelize-typescript'
import { BaseEntity } from '../../../database/entities/base.entity'
import { Order } from '../../orders/entities/order.entity'
import { OrderItems } from '../../orders/entities/order-items.entity'

@Table({
  modelName: 'items',
})
export class Item extends BaseEntity {
  @AllowNull(false)
  @Column
  title: string

  @AllowNull(false)
  @Column
  description: string

  @AllowNull(false)
  @Column
  url: string

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  price: number

  @BelongsToMany(() => Order, () => OrderItems)
  order: Order[]
}
