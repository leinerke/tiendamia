import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import { config } from './config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { WinstonModule } from 'nest-winston'
import { format, transports } from 'winston'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: WinstonModule.createLogger({
      format: format.combine(format.errors({ stack: true }), format.timestamp(), format.ms(), format.json()),
      transports: [new transports.Console()],
    }),
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  if (config().app.mode === 'local') {
    const SwaggerBuilder = new DocumentBuilder().setTitle('tiendamia').setVersion('1.0').build()

    const document = SwaggerModule.createDocument(app, SwaggerBuilder)

    SwaggerModule.setup('docs', app, document, {
      useGlobalPrefix: true,
      explorer: true,
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    })
  }

  app.enableCors()
  await app.listen(config().app.port)
}
bootstrap()
