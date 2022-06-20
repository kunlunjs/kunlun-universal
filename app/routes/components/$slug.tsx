import path from 'path'
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import fs from 'fs-extra'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { toast, ToastContainer } from 'react-toastify'
import { List } from '~/components/collection/List'
import { ToastContext } from '~/context/toast'
import type { KLComponent, KLComponents } from '~/interface/component'
import type { FrontMatter } from '~/interface/frontmatter'
import { getDirectory } from '~/lib/common'
import globalStyles from '~/styles/global.css'

type LoaderData = {
  source: any
  name: string
  frontMatter: FrontMatter
}

const components = { List }

export const meta: MetaFunction = () => {
  // TODO: SEO
  return {
    title: 'Kunlun Universal Components'
  }
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: globalStyles
    }
  ]
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const { slug } = params
  const source = fs.readFileSync(
    path.resolve(getDirectory('components'), `${slug}.mdx`)
  )
  // content 是原始 md/mdx 内容（不含matter），data 是解析的 matter 对象
  const { content, data } = matter(source)
  // NOTE: ES Module 只能这么导入
  const { serialize } = await import('next-mdx-remote/serialize')
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: []
    },
    scope: data
  })
  return json<LoaderData>({
    name: slug!,
    source: mdxSource,
    frontMatter: data as FrontMatter
  })
}

export default function ComponentSlug() {
  // source - html name - 文件名（不含路径和后缀名） frontMatter - matter 解析出的对象
  const { source, name, frontMatter } = useLoaderData() as LoaderData
  // console.log('LoaderData: ', `\n`, name, `\n`, source, `\n`, frontMatter)
  const { seo, spacing, components: items } = frontMatter

  const componentsArray: KLComponents = Object.entries(items).map(
    ([key, value]): KLComponent => {
      return {
        id: key,
        title: value.title,
        tags: value.tags ?? [],
        spacing: value.spacing ?? false
      }
    }
  )

  const data = {
    name,
    spacing,
    examples: componentsArray
  }

  return (
    <ToastContext.Provider value={toast}>
      <>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 pt-24 pb-16">
            <div className="prose max-w-none">
              <MDXRemote {...source} components={components} scope={data} />
            </div>
          </div>
        </section>
        <ToastContainer
          hideProgressBar
          draggable={false}
          closeButton={false}
          limit={1}
          theme="dark"
          className="text-center"
          position="bottom-center"
        />
      </>
    </ToastContext.Provider>
  )
}
