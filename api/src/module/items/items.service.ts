import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateItemDto } from './dto/create-item.dto'
import { Item } from './entities/item.entity'
import { UpdateItemDto } from './dto/update-item.dto'

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item)
    private readonly itemModel: typeof Item,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemModel.create(createItemDto as Partial<CreateItemDto>)
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.findAll()
  }

  async findOne(id: number): Promise<Item | null> {
    return this.itemModel.findByPk(id)
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<number> {
    const [affectedCount] = await this.itemModel.update(updateItemDto, {
      where: { id },
    })
    return affectedCount
  }

  async remove(id: number): Promise<number> {
    const affectedCount = await this.itemModel.destroy({
      where: { id },
    })

    return affectedCount
  }
}
