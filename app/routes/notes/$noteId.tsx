import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { StatSyncFn } from 'fs-extra'
import { ClientOnly } from 'remix-utils'
import type { ExcludeFunctionProperties } from '~/interface/generic'
import { convert } from '~/lib/markdown'
import { request } from '~/lib/request'
import type { NoteItems } from './index'

export type NoteItem = {
  content: string
  meta: ExcludeFunctionProperties<ReturnType<StatSyncFn>>
} & NoteItems['notes'][number]['matter']

type LoaderData = {
  html: string
}

export const loader: LoaderFunction = async ({ params }) => {
  const response = await request.get(`/api/notes/${params.noteId}`)
  const data = response.data as NoteItem
  const html = await convert(data.content)
  // console.log(html)
  return json<LoaderData>({
    html: html
      .replace(
        /<pre>/g,
        '<pre class="h-[200px] overflow-auto rounded-lg p-4 ring-2 ring-black lg:h-[300px]">'
      )
      .replace(/<p>/, '<p class="lead">')
  })
}

export default function NoteByIdRoute() {
  const { html } = useLoaderData() as LoaderData
  return (
    <div className="flex justify-center p-6">
      <ClientOnly fallback={<p>Loading...</p>}>
        {() => (
          <article
            className="prose prose-headings:font-bold prose-lead:leading-relaxed prose-p:leading-loose prose-p:text-black prose-a:font-medium prose-a:text-pink-600 prose-a:decoration-wavy hover:prose-a:text-indigo-600 prose-blockquote:rounded-lg prose-blockquote:border prose-blockquote:border-black prose-blockquote:p-8 prose-blockquote:text-xl prose-blockquote:leading-10 prose-pre:bg-black prose-pre:text-base prose-pre:leading-loose prose-pre:text-white prose-li:font-medium prose-li:text-black marker:prose-li:text-black prose-table:border-separate prose-table:overflow-hidden prose-table:rounded-lg prose-table:border prose-table:border-black prose-thead:bg-black prose-tr:border-y-0 even:prose-tr:bg-gray-100 prose-th:py-2 prose-th:px-4 prose-th:text-white prose-td:py-2 prose-td:px-4 prose-img:rounded-lg prose-img:border prose-img:border-black prose-img:bg-pink-100 prose-img:p-4"
            dangerouslySetInnerHTML={{ __html: html }}
          ></article>
        )}
      </ClientOnly>
    </div>
  )
}
