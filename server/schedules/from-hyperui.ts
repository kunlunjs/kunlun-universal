import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

const hyperuiPath = path.resolve(process.cwd(), '../../Github/hyperui')
const hyperuiMdxPath = path.resolve(hyperuiPath, 'data/components')
const hyperuiComponentsPath = path.resolve(hyperuiPath, 'public/components')
const toMdxDir = path.resolve(process.cwd(), 'app/data/components/hyperui')
const toHtmlDir = path.resolve(process.cwd(), 'public/components/hyperui')
if (fs.existsSync(hyperuiPath)) {
  // ['alerts.mdx', ...]
  const mdxs = fs.readdirSync(hyperuiMdxPath)
  // ['alerts', 'announcements', ...]
  const categories = fs.readdirSync(hyperuiComponentsPath)
  mdxs.forEach(mdx => {
    console.log(chalk.green(`Write to ${toMdxDir}/${mdx} file`))
    fs.writeFileSync(
      `${toMdxDir}/${mdx}`,
      fs.readFileSync(`${hyperuiMdxPath}/${mdx}`)
    )
  })
  categories.forEach(category => {
    // ['1.html', '2.html', ...]
    const htmls = fs.readdirSync(`${hyperuiComponentsPath}/${category}`)
    htmls.forEach(html => {
      const dir = `${toHtmlDir}/${category}`
      console.log(chalk.green(`Write to ${dir}/${html} file`))
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }
      fs.writeFileSync(
        `${dir}/${html}`,
        fs.readFileSync(`${hyperuiComponentsPath}/${category}/${html}`)
      )
    })
  })
}
