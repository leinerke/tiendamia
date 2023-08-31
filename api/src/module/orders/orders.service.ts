import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Order } from './entities/order.entity'
import { OrderItems } from './entities/order-items.entity'
import { Item } from '../items/entities/item.entity'
import { Op } from 'sequelize'

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(OrderItems)
    private readonly orderItemsModel: typeof OrderItems,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.orderModel.create(createOrderDto as Partial<CreateOrderDto>)
    const orderItems = createOrderDto.items.map(async (item) => {
      await this.orderItemsModel.create({
        orderId: order.id,
        itemId: item.id,
        quantity: item.quantity,
      })
    })

    await Promise.all(orderItems)

    return order
  }

  async findAll(status = ''): Promise<Order[]> {
    const where: any = {}

    if (status === 'approve') {
      const twoDaysFromNow = new Date()
      twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2)

      where.status = status
      where.shippingPromise = {
        [Op.lt]: twoDaysFromNow,
      }
    } else if (status === 'traveling') {
      where.status = status
    }

    return this.orderModel.findAll({
      where,
      include: [
        {
          model: Item,
        },
      ],
    })
  }

  async findOne(id: number): Promise<Order | null> {
    return this.orderModel.findByPk(id, {
      include: [Item],
    })
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const [affectedCount] = await this.orderModel.update(updateOrderDto, {
      where: { id },
    })
    return affectedCount
  }

  async remove(id: number): Promise<number> {
    return this.orderModel.destroy({
      where: { id },
    })
  }
}
