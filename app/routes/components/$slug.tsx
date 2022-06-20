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
import { getDirectory } from '~/lib/common'
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
  const { slug } = params
  const source = fs
    .readFileSync(path.resolve(getDirectory('components'), `${slug}.mdx`))
    .toString()
  // content 是原始 md/mdx 内容（不含matter），data 是解析的 matter 对象
  const { content, data } = matter(source)
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
    name: slug!,
    source: mdxSource,
    frontMatter: data as FrontMatter
  })
}

export default function ComponentSlug() {
  // source - html, name - 文件名（不含路径和后缀名）, frontMatter - matter 解析出的对象
  const { source, name, frontMatter } = useLoaderData() as LoaderData
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
