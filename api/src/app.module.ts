import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'
import { config } from './config'
import { OrdersModule } from './module/orders/orders.module'
import { ItemsModule } from './module/items/items.module'
import * as Joi from 'joi'
import { RequestInfoMiddlewareMiddleware } from './middlewares/request-info-middleware/request-info-middleware.middleware'
import { LoggerMiddleware } from './middlewares/logger/logger.middleware'
import { CommonModule } from './common/common.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
    }),
    CommonModule,
    DatabaseModule,
    ItemsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestInfoMiddlewareMiddleware).forRoutes('*')
    consumer.apply(LoggerMiddleware).exclude({ path: '/api/health', method: RequestMethod.GET }).forRoutes('*')
  }
}
