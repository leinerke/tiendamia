import { registerAs } from '@nestjs/config'
import * as process from 'process'

export const config = registerAs('config', () =>
  Object.freeze({
    app: {
      port: process.env.PORT || 3000,
      mode: process.env.MODE || 'local',
    },
    db: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
  }),
)
