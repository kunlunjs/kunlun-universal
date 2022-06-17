import fs from 'fs'
import { extname, join } from 'path'
import matter from 'gray-matter'
import type { KLComponentType } from '~/interface/component'
import { getDirectory } from './common'

/**
 * 默认读取 app/data/components 目录下文件名（含后缀）
 * @returns {String[]}
 * @example
 *   getComponentSlugs() => ['alter.mdx']
 */
export function getComponentSlugs() {
  return fs.readdirSync(getDirectory())
}

/**
 * 根据文件名（slug）获取指定的 matter（fields） 信息
 * @param {String} slug 文件名
 * @param {String[]} fields 指定获取的 markdown/mdx matter 项
 * @returns {{[K in typeof fields[number]]: string | number | boolean}}
 * @example
 *   getComponentBySlug('alter.mdx', ['title','slug','icon','count','tags'])
 *     => { title: 'Alerts', slug: 'alerts', icon: '🚨', count: 1 }
 */
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
    if (field === 'content') {
      items[field] = content
    }
    if (field === 'slug') {
      items[field] = realSlug
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

export function getComponents(
  fields: string[] = [],
  category?: KLComponentType
) {
  // [ 'alerts.mdx' ]
  const slugs = getComponentSlugs()

  // [ { title: 'Alerts', slug: 'alerts', icon: '🚨', count: 1 } ]
  const components = slugs.map(slug => getComponentBySlug(slug, fields))

  // 过滤掉某些类型的主键（非必要）
  if (!category) {
    return components.filter(
      component => !component.ecommerce && !component.application
    )
  }
  return components.filter(component => component[category])
}
