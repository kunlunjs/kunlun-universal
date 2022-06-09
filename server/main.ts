/* eslint-disable react-hooks/rules-of-hooks */
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import chalk from 'chalk'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  })
  app.setGlobalPrefix('api', {
    exclude: []
  })
  app.disable('x-powered-by')

  const configService = app.get(ConfigService)

  await app.listen(configService.get('SERVER_PORT') || 3001)
  console.log(
    chalk.green(
      `⚡️ Server is running on: ${chalk.underline(await app.getUrl())}`
    )
  )
}

bootstrap()
