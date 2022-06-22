export const referers = [
  '[《科技爱好者周刊》- 阮一峰](https://github.com/ruanyf/weekly)'
]

export const types = [
  { label: '开源软件&工具', value: 'software' },
  { label: '科技资讯', value: 'new' },
  { label: '技术文章', value: 'doc' }
]

export const tags = [
  'GO',
  'NPM',
  'CSS',
  'TCP',
  'Vue',
  'NLP',
  'API',
  'HTML',
  'HTTP',
  'React',
  'Nginx',
  'Linux',
  'WebGL',
  'MacOS',
  'Chrome',
  'Canvas',
  'Python',
  'Node.js',
  'Leetcode',
  'Markdown',
  'JavaScript',
  'TypeScript',
  '网站',
  '模板',
  '资讯',
  '数据',
  '规范',
  '框架',
  '协议',
  '加密',
  '算法',
  '教程',
  '游戏',
  '图像',
  '命令行',
  '数据库',
  '服务器',
  '电子书',
  '编辑器',
  '可视化',
  '浏览器',
  '在线工具',
  '搜索引擎',
  '数据结构',
  '人工智能',
  '机器学习',
  '深度学习',
  '自然语言处理'
]
export const tagRegs = tags.map(i => ({
  tag: i,
  reg: new RegExp(i, 'i')
}))
