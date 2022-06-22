import path from 'path'
import chalk from 'chalk'
import * as cheerio from 'cheerio'
import fs from 'fs-extra'
import rimraf from 'rimraf'
import shelljs from 'shelljs'
import supergent from 'superagent'
import { tagRegs } from './constants'

// weekly 目录
let ruanyifengWeekly: string[] = []
// 存放软件工具
const tools: {
  /**
   * 标题
   */
  title: string
  /**
   * 链接
   */
  href?: string
  /**
   * 类型
   */
  type?: string
  /**
   * icon
   */
  icon?: string
  /**
   * 摘取简介或详情中的图片
   */
  image?: string[]
  /**
   * 参考/数据来源
   */
  referer: string
  /**
   * 标签，根据预定义关键词匹配出或用户自定义添加
   */
  tags?: string[]
  /**
   * 详情（可能是富文本）
   */
  description?: string
  /**
   * 创建时间
   */
  createdAt: string
}[] = []
const ruanyifeng = 'https://github.com/ruanyf/weekly'
const weeklyFile = path.join(__dirname, 'weekly.ts')
const toolsFile = path.join(__dirname, 'tools.ts')

export const crawler = async () => {
  if (!fs.existsSync(weeklyFile)) {
    const time1 = process.hrtime()
    const mds = await supergent.get(ruanyifeng)
    const $ = cheerio.load(mds.text)
    $('a').each((_, a) => {
      const href = $(a).attr()?.href
      if (
        href &&
        /\/ruanyf\/weekly\/blob\/master\/docs\/issue-\d+\.md/.test(href)
      ) {
        ruanyifengWeekly.push(`https://github.com${href}`)
      }
    })
    const diff1 = process.hrtime(time1)
    fs.outputFileSync(
      weeklyFile,
      `export default ${JSON.stringify(ruanyifengWeekly, null, 2)}`
    )
    shelljs.exec(`eslint --config "../../.eslintrc.js" --fix ${weeklyFile}`)
    console.log(
      chalk.green(
        `Crawler the ${ruanyifeng} weekly directory and parse url. ${
          (diff1[0] * 1e9 + diff1[1]) / 1000000
        }ms`
      )
    )
  } else {
    ruanyifengWeekly = await import(weeklyFile)
  }

  const time2 = process.hrtime()
  for (const weekly of ruanyifengWeekly) {
    console.log(`Fetch and parse ${weekly}...`)
    const html = await supergent.get(weekly)
    const time = process.hrtime()
    const $ = cheerio.load(html.text)
    let title: string
    $('h1[dir="auto"]').each((i, h1) => {
      console.log('h1: ', $(h1).text())
      if (i === 1) {
        title = $(h1).text()
      }
    })
    let toolIndex = Number.MAX_SAFE_INTEGER
    let pictureIndex = Number.MAX_SAFE_INTEGER
    $('markdown-body.entry-content.p-3.p-md-6>').each((i, el) => {
      if (!title && i === 0) {
        title = $(el).text().split('# ')[1]
      }

      if (/工具|软件/.test($(el).text())) {
        toolIndex = i
      } else if (/图片|文摘|文章/.test($(el).text())) {
        pictureIndex = i
      }

      if (i > toolIndex && i < pictureIndex) {
        if (
          $(el).html() &&
          /\d+&#x3001;/.test($(el).html() as string) &&
          $(el).find('a') &&
          $(el).find('a').text()
        ) {
          const a = $(el).find('a')
          tools.push({
            title: a.text(),
            href: a.attr('href'),
            referer: 'ruanyifeng',
            type: 'software',
            createdAt: new Date().toISOString()
          })
        } else if (tools.length && $(el).find('img').attr()) {
          tools[tools.length - 1].image = [
            $(el).find('img').attr('src') as string
          ]
        } else if (tools.length) {
          const description = $(el).text()
          tools[tools.length - 1].description = description.replace(
            /（.*@.+\s?投稿）|\(.*@.+\s?投稿\)/,
            ''
          )
          const tags = tagRegs
            .map(i => {
              if (i.reg.test(description)) {
                return i.tag as string
              }
            })
            .filter(Boolean)
          tools[tools.length - 1].tags = tags as string[]
        }
      }
    })
    const diff3 = process.hrtime(time)
    console.log(
      chalk.green(
        `Parse《${title!}》. ${(diff3[0] * 1e9 + diff3[1]) / 1000000}ms`
      )
    )
    if (fs.existsSync(toolsFile)) {
      console.log(chalk.red(`Delete "${toolsFile}"`))
      rimraf.sync(toolsFile)
    }
    fs.outputFileSync(
      toolsFile,
      `export default ${JSON.stringify(tools, null, 2)}`
    )

    shelljs.exec(`eslint --fix ${toolsFile}`)
    const diff4 = process.hrtime(time)
    console.log(
      chalk.green(
        `Update tools file completed. ${
          (diff4[0] * 1e9 + diff4[1]) / 1000000
        }ms`
      )
    )
  }
  const diff2 = process.hrtime(time2)
  console.log(
    chalk.green(
      `Grab each weekly content in batches. ${
        (diff2[0] * 1e9 + diff2[1]) / 1000000
      }ms`
    )
  )
}

crawler()
