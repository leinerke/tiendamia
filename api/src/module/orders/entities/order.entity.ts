import { AllowNull, BelongsToMany, Column, DataType, Table } from 'sequelize-typescript'
import { EStatus } from '../interfaces/status'
import { Item } from '../../items/entities/item.entity'
import { BaseEntity } from '../../../database/entities/base.entity'
import { OrderItems } from './order-items.entity'

@Table({
  modelName: 'orders',
})
export class Order extends BaseEntity {
  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(EStatus)),
  })
  status: EStatus

  @AllowNull(false)
  @Column
  client: string

  @AllowNull(false)
  @Column
  shippingAddress: string

  @AllowNull(false)
  @Column
  shippingPromise: Date

  @BelongsToMany(() => Item, () => OrderItems)
  items: Item[]
}
