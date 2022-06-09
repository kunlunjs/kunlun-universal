import fs from 'fs'
import { extname, join } from 'path'
import matter from 'gray-matter'
import { getDirectory } from './common'

export function getComponentSlugs() {
  return fs.readdirSync(getDirectory())
}

export function getComponentBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx?$/, '')
  const fullPath = join(getDirectory(), `${realSlug}${extname(slug)}`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string | number
  }

  const items: Items = {}

  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = realSlug
    }

    if (field === 'content') {
      items[field] = content
    }

    if (field === 'count') {
      items[field] = Object.keys(data.components).length
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function componentSlugs() {
  const slugs = getComponentSlugs().map(slug => slug.replace(/\.mdx?$/, ''))

  return slugs.map(slug => {
    return {
      params: {
        slug
      }
    }
  })
}

export function getComponents(
  fields: string[] = [],
  category?: 'application' | 'ecommerce'
) {
  const slugs = getComponentSlugs()
  const components = slugs.map(slug => getComponentBySlug(slug, fields))
  if (!category) {
    return components.filter(
      component => !component.ecommerce && !component.application
    )
  }
  return components.filter(component => component[category])
}
