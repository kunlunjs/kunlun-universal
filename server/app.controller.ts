import { resolve } from 'path'
import { Controller, Get } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config'
import { readFileSync, statSync } from 'fs-extra'

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  // TODO
  @Get()
  index() {
    return []
  }

  @Get('notes')
  findManyNotes() {
    const file = resolve(process.cwd(), 'public/notes/demo.mdx')
    const note = readFileSync(file).toString()
    const meta = statSync(file)
    return { note, meta }
  }
}
