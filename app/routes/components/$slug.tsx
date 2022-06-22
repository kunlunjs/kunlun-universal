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
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { MDXRemote } from 'next-mdx-remote'
import { toast, ToastContainer } from 'react-toastify'
import toastStyles from 'react-toastify/dist/ReactToastify.css'
import { List } from '~/components/collection/List'
import { ToastContext } from '~/context/toast'
import type { KLComponent, KLComponents } from '~/interface/component'
import type { FrontMatter } from '~/interface/frontmatter'
import { getDataDirectory } from '~/lib/common'
import globalStyles from '~/styles/global.css'

type LoaderData = {
  name: string
  frontMatter: FrontMatter
  source: MDXRemoteSerializeResult<Record<string, unknown>>
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
    },
    // TODO: 未生效
    {
      rel: 'toastStyles',
      href: toastStyles
    }
  ]
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  // slug: http://localhost:3000/components/alerts?dir=hyperui -> footers
  const { slug } = params
  const { url } = request
  const hasDir = url.match(/\?dir=([\w-_]+)$/)
  const dir = hasDir ? `${hasDir[1]}/` : ''
  const mdx = fs
    .readFileSync(
      path.resolve(getDataDirectory('components'), `${dir}${slug}.mdx`)
    )
    .toString()
  // content 是原始 md/mdx 内容（不含matter），data 是解析的 matter 对象
  // data 是对应 mdx --- 之间解析出的 matter 信息
  const { content, data } = matter(mdx)
  // NOTE: ES Module
  const { serialize } = await import('next-mdx-remote/serialize')
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: []
    },
    scope: data
  })

  return json<LoaderData>({
    name: `${dir}${slug!}`,
    source: mdxSource,
    frontMatter: data as FrontMatter
  })
}

export default function ComponentSlug() {
  // source - html, name - 文件名（不含路径和后缀名）, frontMatter - matter 解析出的对象
  const { source, name, frontMatter } = useLoaderData() as LoaderData
  const { seo, spacing, components: items } = frontMatter

  const componentsArray: KLComponents = items
    ? Object.entries(items).map(([key, value]): KLComponent => {
        return {
          id: key,
          title: value.title,
          tags: value.tags ?? [],
          spacing: value.spacing ?? false
        }
      })
    : []

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
          limit={1}
          theme="dark"
          hideProgressBar
          draggable={false}
          closeButton={false}
          position="top-center"
          className="text-center"
        />
      </>
    </ToastContext.Provider>
  )
}
