import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ClientOnly } from 'remix-utils'
import { convert } from '~/lib/markdown'
import { request } from '~/lib/request'

type LoaderData = {
  html: string
}

export const loader: LoaderFunction = async () => {
  const response = await request.get('/api/notes')
  const text = response.data
  const html = await convert(text.note)
  // console.log(html)
  return json<LoaderData>({
    html: `<article class="max-w-7xl w-[1024px] prose lg:prose-xl">${html.replace(
      /<pre>/g,
      '<pre class="h-[200px] overflow-auto rounded-lg p-4 ring-2 ring-black lg:h-[300px]">'
    )}</article>`
  })
}

export default function NotesRoute() {
  const { html } = useLoaderData() as LoaderData

  return (
    <div className="flex justify-center p-6">
      <ClientOnly fallback={<p>Loading...</p>}>
        {() => (
          <div
            className="flex justify-center"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        )}
      </ClientOnly>
    </div>
  )
}
