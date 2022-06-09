import { join } from 'path'

// NOTE: 注意不要直接在最外层写 NodeJS fs 或 path 相关代码
// 否则会发生如下错误：https://github.com/remix-run/remix/issues?q=The+node+to+be+removed+is+not+a+child+of+this+node
export function getDirectory(
  dir: 'components' | 'notes' | 'snippets' | 'tools' = 'components'
) {
  return join(process.cwd(), `app/data/${dir}`)
}
