import { Module } from '@nestjs/common'
import { ItemsService } from './items.service'
import { ItemsController } from './items.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Item } from './entities/item.entity'

@Module({
  imports: [SequelizeModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [
    ItemsService,
    {
      provide: 'ITEMS_REPOSITORY',
      useValue: Item,
    },
  ],
})
export class ItemsModule {}
