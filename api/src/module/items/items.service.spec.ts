import { Test, TestingModule } from '@nestjs/testing'
import { ItemsService } from './items.service'
import { getModelToken } from '@nestjs/sequelize'
import { Item } from './entities/item.entity'
import { CreateItemDto } from './dto/create-item.dto'

describe('ItemsService', () => {
  let service: ItemsService

  const mockModel = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getModelToken(Item),
          useValue: mockModel,
        },
      ],
    }).compile()

    service = module.get<ItemsService>(ItemsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create an item', async () => {
      const createItemDto: CreateItemDto = {
        title: 'Test Item',
        description: 'This is a test item',
        url: 'https://example.com/item',
        price: 9.99,
      }

      const newItem = { ...createItemDto, id: 1 }

      mockModel.create.mockReturnValue(newItem)

      const result = await service.create(createItemDto)

      expect(result).toEqual(newItem)
      expect(mockModel.create).toHaveBeenCalledWith(createItemDto)
    })
  })

  describe('findAll', () => {
    it('shoild return an array of items', async () => {
      const items = [
        { id: 1, title: 'Item 1', description: 'Description 1', url: 'https://example.com/item1', price: 10.99 },
        { id: 2, title: 'Item 2', description: 'Description 2', url: 'https://example.com/item2', price: 20.99 },
      ]

      mockModel.findAll.mockReturnValue(items)

      const result = await service.findAll()

      expect(result).toEqual(items)
      expect(mockModel.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should return a single item by ID', async () => {
      const itemId = 1
      const item = { id: itemId, title: 'Test Item', description: 'Description', url: 'https://example.com/item', price: 9.99 }

      mockModel.findByPk.mockReturnValue(item)

      const result = await service.findOne(itemId)

      expect(result).toEqual(item)
      expect(mockModel.findByPk).toHaveBeenCalledWith(itemId)
    })

    it('should return null if item is not found', async () => {
      const itemId = 999

      mockModel.findByPk.mockReturnValue(null)

      const result = await service.findOne(itemId)

      expect(result).toBeNull()
      expect(mockModel.findByPk).toHaveBeenCalledWith(itemId)
    })
  })

  describe('update', () => {
    it('should update an item by ID', async () => {
      const itemId = 1
      const updateItemDto: CreateItemDto = {
        title: 'Updated Item',
        description: 'Updated Description',
        url: 'https://updated.com/item',
        price: 19.99,
      }
      const updatedCount = 1
      const updatedItems = [{ ...updateItemDto, id: itemId }]

      mockModel.update.mockReturnValue([updatedCount, updatedItems])
      mockModel.findByPk.mockReturnValue(updatedItems[0])

      const result = await service.update(itemId, updateItemDto)

      expect(result).toEqual(1)
      expect(mockModel.update).toHaveBeenCalledWith(updateItemDto, { where: { id: itemId } })
      expect(mockModel.findByPk).toHaveBeenCalledWith(itemId)
    })

    it('should return null if item is not found for update', async () => {
      const itemId = 999
      const updateItemDto: CreateItemDto = {
        title: 'Updated Item',
        description: 'Updated Description',
        url: 'https://updated.com/item',
        price: 19.99,
      }
      const updatedCount = 0

      mockModel.update.mockReturnValue([updatedCount, null])

      const result = await service.update(itemId, updateItemDto)

      expect(result).toEqual(0)
      expect(mockModel.update).toHaveBeenCalledWith(updateItemDto, { where: { id: itemId } })
    })
  })

  describe('remove', () => {
    it('should remove an item by ID', async () => {
      const itemId = 1
      const deletedCount = 1

      mockModel.destroy.mockReturnValue(deletedCount)

      const result = await service.remove(itemId)

      expect(result).toBe(deletedCount)
      expect(mockModel.destroy).toHaveBeenCalledWith({ where: { id: itemId } })
    })

    it('should return 0 if item is not found for removal', async () => {
      const itemId = 999
      const deletedCount = 0

      mockModel.destroy.mockReturnValue(deletedCount)

      const result = await service.remove(itemId)

      expect(result).toBe(deletedCount)
      expect(mockModel.destroy).toHaveBeenCalledWith({ where: { id: itemId } })
    })
  })
})
