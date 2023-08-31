import { AllowNull, Column, ForeignKey, Table } from 'sequelize-typescript'
import { BaseEntity } from '../../../database/entities/base.entity'
import { Order } from './order.entity'
import { Item } from '../../items/entities/item.entity'

@Table({
  modelName: 'order_items',
})
export class OrderItems extends BaseEntity {
  @AllowNull(false)
  @ForeignKey(() => Order)
  @Column
  orderId: number

  @AllowNull(false)
  @ForeignKey(() => Item)
  @Column
  itemId: number

  @AllowNull(false)
  @Column
  quantity: number
}
