/**
 * TODO：支持 url 外部文件
 * 支持 markdown 文件中引入外部文件
 * @example
 *   {{file1.js}}
 *   {{file-2.json}}
 *   {{dir/file-3.json}}
 *   {{file-2.json:1-20}} 表示第1-20行之间的内容
 *   {{file-2.json:10}} 表示从第10行之后的内容
 *   {{file-2.json:-20}} 表示从0行到第20行之间的内容
 */
export const EXTRA_FILE_RULE =
  /^\{\{([\w-/]+\.(js|jsx|ts|tsx|json|html|css|less|scss|sass))(:\w+-\w+|:\w+|:-\w+)?\}\}$/
