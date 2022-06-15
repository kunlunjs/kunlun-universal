import { join } from 'path'
import fs from 'fs-extra'
import matter from 'gray-matter'
import { getDirectory } from './common'

export function getNoteSlugs() {
  return fs.readdirSync(getDirectory('notes'))
}

export function getNoteBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(getDirectory('notes'), `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = realSlug
    }

    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function noteSlugs(): Array<object> {
  const slugs = getNoteSlugs().map(slug => slug.replace(/\.md$/, ''))

  return slugs.map(slug => {
    return {
      params: {
        slug
      }
    }
  })
}

export function getAllNotes(fields: string[] = []) {
  const slugs = getNoteSlugs()

  const notes = slugs
    .map(slug => getNoteBySlug(slug, fields))
    .sort((noteA, noteB) =>
      new Date(noteA.date) < new Date(noteB.date) ? 1 : -1
    )

  return notes
}
