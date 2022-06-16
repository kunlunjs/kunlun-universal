import { resolve } from 'path'
import { Controller, Get, Param } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config'
import { readdirSync, readFileSync, statSync } from 'fs-extra'
import matter from 'gray-matter'

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
    const dir = resolve(process.cwd(), 'public/notes')
    const notes = readdirSync(dir)
    const result = notes.map(note => {
      const data = matter(readFileSync(dir + `/${note}`)).data
      const matters = { ...data }
      if (data?.tags) {
        matters.tags = data.tags.split(' ')
      }
      if (data?.categories) {
        matters.categories = data.categories.split(' ')
      }
      return {
        name: note,
        matter: {
          title: note,
          ...matters
        }
      }
    })
    return result
  }

  @Get('notes/:id')
  findNoteById(@Param('id') id: string) {
    const file = resolve(process.cwd(), `public/notes/${id}.mdx`)
    const { content, data } = matter(readFileSync(file).toString())
    const meta = statSync(file)
    const matters: Record<string, any> = { title: `${id}.mdx`, ...data }
    if (data?.tags) {
      matters.tags = data.tags.split(' ')
    }
    if (data?.categories) {
      matters.categories = data.categories.split(' ')
    }
    return { content, matter: matters, meta }
  }
}
