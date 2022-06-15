import type { Transformer } from 'unified'

export async function convert(content: string) {
  const { unified } = await import('unified')
  const { default: parse } = await import('remark-parse')
  const { default: rehype } = await import('remark-rehype')
  const { default: toc } = await import('remark-toc')
  const { default: gfm } = await import('remark-gfm')
  const { default: prism } = await import('remark-prism')
  const { default: stringify } = await import('rehype-stringify')
  // const { default: codeFrontmatter } = await import('remark-code-frontmatter')
  const { visit } = await import('unist-util-visit')
  const { default: report } = await import('vfile-reporter')

  const transformer: Transformer = (tree, _file) => {
    visit(tree, 'code', node => {})
    return tree
  }

  try {
    const result = await unified()
      .use(parse)
      .use(prism)
      .use(gfm)
      .use(toc)
      .use(rehype)
      .use(stringify)
      // .use(codeFrontmatter)
      // .use(() => transformer)
      // .use(codeExtra, {})
      .process(content)
    return result.toString()
  } catch (err: any) {
    console.error(report(err))
    return ''
  }
}
