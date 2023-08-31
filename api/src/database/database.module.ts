import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { config } from '../config'
import { ConfigType } from '@nestjs/config'

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) =>
        Object.freeze({
          ...configService.db,
          dialect: 'mysql',
          autoLoadModels: true,
          synchronize: false,
          define: {
            timestamps: true,
            paranoid: true,
            underscored: true,
          },
          logging: false,
        }),
      inject: [config.KEY],
    }),
  ],
})
export class DatabaseModule {}
