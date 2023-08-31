import { Test, TestingModule } from '@nestjs/testing'
import { OrdersService } from './orders.service'
import { Order } from './entities/order.entity'
import { getModelToken } from '@nestjs/sequelize'
import { OrderItems } from './entities/order-items.entity'
import { CreateOrderDto } from './dto/create-order.dto'
import { EStatus } from './interfaces/status'
import { UpdateOrderDto } from './dto/update-order.dto'

describe('OrdersService', () => {
  let service: OrdersService

  const mockOrderModel = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  }

  const mockOrderItemsModel = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getModelToken(Order),
          useValue: mockOrderModel,
        },
        {
          provide: getModelToken(OrderItems),
          useValue: mockOrderItemsModel,
        },
      ],
    }).compile()

    service = module.get<OrdersService>(OrdersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create an order with order items', async () => {
      const createOrderDto: CreateOrderDto = {
        status: EStatus.approve,
        client: 'string',
        shippingAddress: 'string',
        shippingPromise: new Date('2023-08-30T04:23:05.528Z'),
        items: [
          {
            id: 1,
            quantity: 10,
          },
          {
            id: 3,
            quantity: 40,
          },
        ],
      }
      const createdOrder = { ...createOrderDto, id: 1 }

      mockOrderModel.create.mockReturnValue(createdOrder)
      mockOrderItemsModel.create.mockImplementation((data) => data)

      const result = await service.create(createOrderDto)

      expect(result).toEqual(createdOrder)
      expect(mockOrderModel.create).toHaveBeenCalledWith(createOrderDto)
      expect(mockOrderItemsModel.create).toHaveBeenCalledTimes(2)
      expect(mockOrderItemsModel.create).toHaveBeenCalledWith({
        orderId: createdOrder.id,
        itemId: createOrderDto.items[0].id,
        quantity: createOrderDto.items[0].quantity,
      })
      expect(mockOrderItemsModel.create).toHaveBeenCalledWith({
        orderId: createdOrder.id,
        itemId: createOrderDto.items[1].id,
        quantity: createOrderDto.items[1].quantity,
      })
    })
  })

  describe('findAll', () => {
    it('should return an array of orders with items', async () => {
      const orders = [
        {
          id: 1,
          client: 'John Doe',
          shippingAddress: '123 Main St',
          shippingPromise: new Date(),
          items: [{ id: 1, quantity: 2 }],
        },
        {
          id: 2,
          client: 'Jane Smith',
          shippingAddress: '456 Elm St',
          shippingPromise: new Date(),
          items: [{ id: 2, quantity: 1 }],
        },
      ]

      mockOrderModel.findAll.mockReturnValue(orders)

      const result = await service.findAll()

      expect(result).toEqual(orders)
    })
  })

  describe('findOne', () => {
    it('should return a single order by ID', async () => {
      const orderId = 1
      const order = {
        id: orderId,
        client: 'John Doe',
        shippingAddress: '123 Main St',
        shippingPromise: new Date(),
        items: [{ id: 1, quantity: 2 }],
      }

      mockOrderModel.findByPk.mockReturnValue(order)

      const result = await service.findOne(orderId)

      expect(result).toEqual(order)
    })

    it('should return null if order is not found', async () => {
      const orderId = 999

      mockOrderModel.findByPk.mockReturnValue(null)

      const result = await service.findOne(orderId)

      expect(result).toBeNull()
    })
  })

  describe('update', () => {
    it('should update an order by ID', async () => {
      const orderId = 1
      const updateOrderDto: UpdateOrderDto = {
        client: 'Updated Client',
        shippingAddress: 'Updated Address',
        shippingPromise: new Date(),
      }
      const updatedCount = 1

      mockOrderModel.update.mockReturnValue([updatedCount])

      const result = await service.update(orderId, updateOrderDto)

      expect(result).toBe(updatedCount)
      expect(mockOrderModel.update).toHaveBeenCalledWith(updateOrderDto, {
        where: { id: orderId },
      })
    })

    it('should return 0 if order is not found for update', async () => {
      const orderId = 999
      const updateOrderDto: UpdateOrderDto = {
        client: 'Updated Client',
        shippingAddress: 'Updated Address',
        shippingPromise: new Date(),
      }
      const updatedCount = 0

      mockOrderModel.update.mockReturnValue([updatedCount])

      const result = await service.update(orderId, updateOrderDto)

      expect(result).toBe(updatedCount)
      expect(mockOrderModel.update).toHaveBeenCalledWith(updateOrderDto, {
        where: { id: orderId },
      })
    })
  })

  describe('remove', () => {
    it('should remove an order by ID', async () => {
      const orderId = 1
      const deletedCount = 1

      mockOrderModel.destroy.mockReturnValue(deletedCount)

      const result = await service.remove(orderId)

      expect(result).toBe(deletedCount)
      expect(mockOrderModel.destroy).toHaveBeenCalledWith({ where: { id: orderId } })
    })

    it('should return 0 if order is not found for removal', async () => {
      const orderId = 999
      const deletedCount = 0

      mockOrderModel.destroy.mockReturnValue(deletedCount)

      const result = await service.remove(orderId)

      expect(result).toBe(deletedCount)
      expect(mockOrderModel.destroy).toHaveBeenCalledWith({ where: { id: orderId } })
    })
  })
})
