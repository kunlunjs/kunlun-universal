import fs from 'fs'
import { extname, join } from 'path'
import matter from 'gray-matter'
import type { KLComponentType } from '~/interface/component'
import { getDataDirectory } from './common'

/**
 * 默认读取 app/data/components 目录下文件名（含目录和后缀，最多 components 下一层目录）
 * @returns {String[]}
 * @example
 *   getComponentSlugs() => ['hyperui/alter.mdx', ...]
 */
export function getDataComponentSlugs() {
  const dirs = fs.readdirSync(getDataDirectory('components'))
  const result: string[] = []
  dirs.forEach(dir => {
    const fileOrDir = join(process.cwd(), `app/data/components/${dir}`)
    if (fs.statSync(fileOrDir).isDirectory()) {
      const subDirs = fs.readdirSync(fileOrDir)
      subDirs.forEach(subDir => {
        result.push(`${dir}/${subDir}`)
      })
    }
    if (fs.statSync(fileOrDir).isFile()) {
      result.push(fileOrDir)
    }
  })
  return result
}

/**
 * 根据文件名（slug）获取指定的 matter（fields） 信息
 * @param {String} slug 文件名
 * @param {String[]} fields 指定获取的 markdown/mdx matter 项
 * @returns {{[K in typeof fields[number]]: string | number | boolean}}
 * @example
 *   getComponentBySlug('alter.mdx', ['title','slug','emoji','count','tags'])
 *     => { title: 'Alerts', slug: 'hyperui/alerts', emoji: '🚨', count: 1 }
 */
export function getDataComponentBySlug(slug: string, fields: string[] = []) {
  // ex: hyperui/alters.mdx
  const realSlug = slug.replace(/\.mdx?$/, '')
  const fullPath = join(
    getDataDirectory('components'),
    `${realSlug}${extname(slug)}`
  )
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

/**
 * 返回指定或所有 mdx 文件
 * @param {String[]} fields
 * @param {String} category
 * @returns [{ title: 'Alerts', slug: 'hyperui/alerts', emoji: '🚨', count: 7 },...]
 */
export function getDataComponents(
  fields: string[] = [],
  category?: KLComponentType
) {
  // [ 'hyperui/alerts.mdx', ... ]
  const slugs = getDataComponentSlugs()

  // [ { title: 'Alerts', slug: 'hyperui/alerts', emoji: '🚨', count: 1 },... ]
  const components = slugs.map(slug => getDataComponentBySlug(slug, fields))

  // 过滤掉某些类型的主键（非必要）
  if (!category) {
    return components.filter(
      component => !component.ecommerce && !component.application
    )
  }
  return components.filter(component => component[category])
}
