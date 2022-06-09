import { Controller, Get } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config'

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  // TODO
  @Get()
  index() {
    return []
  }
}
