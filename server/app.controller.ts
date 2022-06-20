import { resolve } from 'path'
import { Controller, Get, Param } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config'
import { readdirSync, readFileSync, statSync } from 'fs-extra'
import matter from 'gray-matter'
import { EXTRA_FILE_RULE } from './utils'

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
    const result = notes
      .map(note => {
        if (statSync(`${dir}/${note}`).isFile()) {
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
        }
        return null
      })
      .filter(Boolean)
    return result
  }

  @Get('notes/:id')
  async findNoteById(@Param('id') id: string) {
    const file = resolve(process.cwd(), `public/notes/${id}.mdx`)
    const matterResult = matter(readFileSync(file).toString())
    const { data: matterInfo } = matterResult
    const lines = matterResult.content.split(/\r?\n/)
    for (const line of lines) {
      const extraFile = line.trim().match(EXTRA_FILE_RULE)
      if (extraFile) {
        const [origin, realPath, suffix] = extraFile
        const extraContent = readFileSync(
          resolve(process.cwd(), `public/notes/${realPath}`)
        ).toString()
        matterResult.content = matterResult.content.replace(
          origin,
          `
\`\`\`${suffix}
${extraContent}
\`\`\`
        `
        )
      }
    }
    const meta = statSync(file)
    const matters: Record<string, any> = { title: `${id}.mdx`, ...matterInfo }
    if (matterInfo?.tags) {
      matters.tags = matterInfo.tags.split(' ')
    }
    if (matterInfo?.categories) {
      matters.categories = matterInfo.categories.split(' ')
    }
    return { content: matterResult.content, matter: matters, meta }
  }
}
