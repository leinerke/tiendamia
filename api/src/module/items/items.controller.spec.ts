import { Test, TestingModule } from '@nestjs/testing'
import { ItemsController } from './items.controller'
import { ItemsService } from './items.service'

describe('ItemsController', () => {
  let controller: ItemsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: jest.fn(),
        },
      ],
    }).compile()

    controller = module.get<ItemsController>(ItemsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
