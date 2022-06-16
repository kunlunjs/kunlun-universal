import { resolve } from 'path'
import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // const LOG_LEVEL = configService.get('LOG_LEVEL')
        return {
          pinoHttp: {
            // level: LOG_LEVEL,
            transport: {
              targets: [
                {
                  target: 'pino/file',
                  level: 'info',
                  options: {
                    mkdir: true,
                    destionation: resolve(process.cwd(), 'logs/access.log')
                  }
                }
              ]
            }
          }
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // TODO
    // consumer.apply().forRoutes('*')
  }
}
