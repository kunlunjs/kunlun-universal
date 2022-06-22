import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { StatSyncFn } from 'fs-extra'
import { ClientOnly } from 'remix-utils'
import { ReactMarkdownAlias as ReactMarkdown } from '~/components/react-markdown'
import type { ExcludeFunctionProperties } from '~/interface/generic'
import { convert } from '~/lib/markdown'
import { request } from '~/lib/request'
import { ModulerLoader } from '~/module.loader'
// @ts-ignore
import { getReactMarkdown } from '../../../esm-module'
import type { NoteItems } from './index'

export type NoteItem = {
  content: string
  meta: ExcludeFunctionProperties<ReturnType<StatSyncFn>>
} & {
  matter: NoteItems['notes'][number]
}

type LoaderData = {
  html: string
  markdown: string
  matter: NoteItems['notes'][number]['matter']
}

export const loader: LoaderFunction = async ({ params }) => {
  const response = await request.get(`/notes/${params.noteId}`)
  const data = response.data as NoteItem
  const html = await convert(data.content)
  return json<LoaderData>({
    markdown: data.content,
    matter: data.matter,
    html: html
      .replace(
        /<pre>/g,
        '<pre class="h-[200px] overflow-auto rounded-lg p-4 ring-2 ring-black lg:h-[300px]">'
      )
      .replace(/<p>/, '<p class="lead">')
  })
}

export const meta: MetaFunction = () => {
  return {}
}

export const links: LinksFunction = () => {
  return []
}

export default function NoteByIdRoute() {
  const { matter, html, markdown } = useLoaderData() as LoaderData

  const schema: NoteItems['notes'][number]['matter'] = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': ``
    },
    'headline': `${matter.title}`,
    'datePublished': new Date().toISOString(),
    'dateModified': new Date().toISOString(),
    'author': {
      '@type': 'Person',
      'name': matter.author as string,
      'url': 'https://twitter.com/itsmarkmead'
    },
    'publisher': {
      '@type': 'Organization',
      'name': matter.author as string
    },
    'articleBody': html,
    'image': {
      '@type': 'ImageObject',
      'url': 'https://www.hyperui.dev/og.png',
      'height': 630,
      'width': 1200
    }
  }

  return (
    <ClientOnly fallback={<p>Loading...</p>}>
      {() => (
        <>
          {/* <header>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            ></script>
            <title>{matter.title}</title>
            <meta
              content={matter.introduction}
              key="description"
              name="description"
            />
          </header> */}
          <div className="mx-auto max-w-screen-xl px-4 py-8">
            <article className="prose mx-auto prose-img:w-full prose-img:rounded-lg">
              <header>
                <time className="text-sm text-gray-500">
                  {matter.publishAt}
                </time>
                <h1 className="mt-1">{matter.title}</h1>
              </header>
              {/* <main dangerouslySetInnerHTML={{ __html: html }}></main> */}
              <ModulerLoader imports={{ 'react-markdown': getReactMarkdown }}>
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </ModulerLoader>
            </article>
          </div>
        </>
      )}
    </ClientOnly>
  )
}
